import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { NgxPaginationModule } from 'ngx-pagination'; 

@Component({
  selector: 'app-kategori',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './kategori.component.html',
  styleUrl: './kategori.component.css'
})
export class KategoriComponent implements OnInit {
  kategori: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  apiUrl = 'https://uas-backend-iota.vercel.app/api/kategori';
  isLoading = true;

  kategoriForm: FormGroup;
  isSubmitting = false;
  editKategoriId: string | null = null;

  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  constructor() {
    this.kategoriForm = this.fb.group({
      nama: ['', Validators.required],
      deskripsi: ['', Validators.required],
      url: ['', Validators.required],
      status: ['aktif'] // Tambahkan field status dengan nilai default 'aktif'
    });
  }

  ngOnInit(): void {
    this.getKategori();
  }

  getKategori(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.kategori = data;
        console.log('Data Kategori:', this.kategori);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching kategori data:', err);
        this.isLoading = false;
      },
    });
  }

  addKategori(): void {
    if (this.kategoriForm.valid) {
      this.isSubmitting = true;
      this.http.post(this.apiUrl, this.kategoriForm.value).subscribe({
        next: (response) => {
          console.log('Data berhasil ditambahkan:', response);
          this.getKategori();
          this.kategoriForm.reset();
          this.isSubmitting = false;
          this.closeModal('tambahKategoriModal');
        },
        error: (err) => {
          console.error('Error menambahkan kategori:', err);
          this.isSubmitting = false;
        },
      });
    }
  }

  deleteKategori(_id: string): void {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      this.http.delete(`${this.apiUrl}/${_id}`).subscribe({
        next: () => {
          console.log(`Kategori dengan ID ${_id} berhasil dihapus`);
          this.getKategori();
        },
        error: (err) => {
          console.error('Error menghapus kategori:', err);
        }
      });
    }
  }

  getKategoriById(_id: string): void {
    this.editKategoriId = _id;
    this.http.get(`${this.apiUrl}/${_id}`).subscribe({
      next: (data: any) => {
        this.kategoriForm.patchValue({
          nama: data.nama,
          deskripsi: data.deskripsi,
          url: data.url,
          status: data.status // Set nilai status pada form
        });
        this.openModal('editKategoriModal'); 
      },
      error: (err) => {
        console.error('Error fetching kategori data by ID:', err);
      },
    });
  }

  updateKategori(): void {
    if (this.kategoriForm.valid) {
      this.isSubmitting = true;
      this.http.put(`${this.apiUrl}/${this.editKategoriId}`, this.kategoriForm.value).subscribe({
        next: (response) => {
          console.log('Kategori berhasil diperbarui:', response);
          this.getKategori();
          this.isSubmitting = false;
          this.closeModal('editKategoriModal'); 
        },
        error: (err) => {
          console.error('Error updating kategori:', err);
          this.isSubmitting = false;
        },
      });
    }
  }

  // Fungsi untuk membuka modal
  private openModal(modalId: string): void {
    const modalElement = document.getElementById(modalId) as HTMLElement;
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Fungsi untuk menutup modal
  private closeModal(modalId: string): void {
    const modalElement = document.getElementById(modalId) as HTMLElement;
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();
    }
  }
}