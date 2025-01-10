import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-berita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule], 
  templateUrl: './berita.component.html',
  styleUrl: './berita.component.css'
})
export class BeritaComponent implements OnInit {
  berita: any[] = [];
  penulis: any[] = []; 
  kategori: any[] = []; 
  sumber: any[] = []; 
  currentPage = 1;
  itemsPerPage = 5; 
  apiUrl = 'https://uas-backend-iota.vercel.app/api/berita';
  apiUrlPenulis = 'https://uas-backend-iota.vercel.app/api/penulis'; 
  apiUrlKategori = 'https://uas-backend-iota.vercel.app/api/kategori'; 
  apiUrlSumber = 'https://uas-backend-iota.vercel.app/api/sumber'; 
  isLoading = true;
  beritaForm: FormGroup;
  isSubmitting = false;
  editBeritaId: string | null = null;

  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  constructor() {
    this.beritaForm = this.fb.group({
      judul: ['', Validators.required],
      isiBerita: ['', Validators.required],
      tanggalTerbit: ['', Validators.required], 
      penulis: ['', Validators.required], 
      status: ['Draft'], 
      gambarUtama: [''],
      url: ['', Validators.required],
      kategori: ['', Validators.required], 
      sumber: [[]] 
    });
  }

  ngOnInit(): void {
    this.getBerita();
    this.getPenulis(); 
    this.getKategori(); 
    this.getSumber(); 
  }

  getBerita(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.berita = data;
        console.log('Data Berita:', this.berita);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching berita data:', err);
        this.isLoading = false;
      },
    });
  }

  getPenulis(): void {
    this.http.get<any>(this.apiUrlPenulis).subscribe({
      next: (data) => {
        this.penulis = data;
      },
      error: (err) => {
        console.error('Error fetching penulis data:', err);
      }
    });
  }

  getKategori(): void {
    this.http.get<any>(this.apiUrlKategori).subscribe({
      next: (data) => {
        this.kategori = data;
      },
      error: (err) => {
        console.error('Error fetching kategori data:', err);
      }
    });
  }

  getSumber(): void {
    this.http.get<any>(this.apiUrlSumber).subscribe({
      next: (data) => {
        this.sumber = data;
      },
      error: (err) => {
        console.error('Error fetching sumber data:', err);
      }
    });
  }


  addBerita(): void {
    if (this.beritaForm.valid) {
      this.isSubmitting = true;
      const token = localStorage.getItem('authToken');
      const headers = { Authorization: `Bearer ${token}` };

      this.http.post(this.apiUrl, this.beritaForm.value, { headers }).subscribe({
        next: (response) => {
          console.log('Data berhasil ditambahkan:', response);
          this.getBerita();
          this.beritaForm.reset(); 
          this.isSubmitting = false;
          this.closeModal('tambahBeritaModal');
        },
        error: (err) => {
          console.error('Error menambahkan berita:', err);
          this.isSubmitting = false;
        },
      });
    }
  }

  deleteBerita(_id: string): void {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const token = localStorage.getItem('authToken');
      const headers = { Authorization: `Bearer ${token}` };

      this.http.delete(`${this.apiUrl}/${_id}`, { headers }).subscribe({
        next: () => {
          console.log(`Berita dengan ID ${_id} berhasil dihapus`);
          this.getBerita();
        },
        error: (err) => {
          console.error('Error menghapus berita:', err);
        }
      });
    }
  }

  getBeritaById(_id: string): void {
    this.editBeritaId = _id;
    this.http.get(`${this.apiUrl}/${_id}`).subscribe({
      next: (data: any) => {
        this.beritaForm.patchValue(data); 
        this.openModal('editBeritaModal');
      },
      error: (err) => {
        console.error('Error fetching berita data by ID:', err);
      },
    });
  }

  updateBerita(): void {
    if (this.beritaForm.valid) {
      this.isSubmitting = true;
      const token = localStorage.getItem('authToken');
      const headers = { Authorization: `Bearer ${token}` };

      this.http.put(`${this.apiUrl}/${this.editBeritaId}`, this.beritaForm.value, { headers }).subscribe({
        next: (response) => {
          console.log('Berita berhasil diperbarui:', response);
          this.getBerita();
          this.isSubmitting = false;
          this.closeModal('editBeritaModal');
        },
        error: (err) => {
          console.error('Error updating berita:', err);
          this.isSubmitting = false;
        },
      });
    }
  }

  private openModal(modalId: string): void {
    const modalElement = document.getElementById(modalId) as HTMLElement;
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  private closeModal(modalId: string): void {
    const modalElement = document.getElementById(modalId) as HTMLElement;
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();
    }
  }
}