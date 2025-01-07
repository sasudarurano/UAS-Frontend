import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-penulis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './penulis.component.html',
  styleUrl: './penulis.component.css'
})
export class PenulisComponent implements OnInit {
  penulis: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  apiUrl = 'https://uas-backend-iota.vercel.app/api/penulis';
  isLoading = true;

  penulisForm: FormGroup;
  isSubmitting = false;
  editPenulisId: string | null = null;

  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  constructor() {
    this.penulisForm = this.fb.group({
      nama: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profilSingkat: ['', Validators.required],
      fotoProfil: ['', Validators.required],
      spesialisasi: ['', Validators.required],
      status: ['aktif']
    });
  }

  ngOnInit(): void {
    this.getPenulis();
  }

  getPenulis(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.penulis = data;
        console.log('Data Penulis:', this.penulis);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching penulis data:', err);
        this.isLoading = false;
      },
    });
  }

  addPenulis(): void {
    if (this.penulisForm.valid) {
      this.isSubmitting = true;

      const token = localStorage.getItem('authToken');
      const headers = { Authorization: `Bearer ${token}` };

      this.http.post(this.apiUrl, this.penulisForm.value, { headers }).subscribe({
        next: (response) => {
          console.log('Data berhasil ditambahkan:', response);
          this.getPenulis();
          this.penulisForm.reset();
          this.penulisForm.patchValue({ status: 'aktif' });
          this.isSubmitting = false;
          this.closeModal('tambahPenulisModal');
        },
        error: (err) => {
          console.error('Error menambahkan penulis:', err);
          this.isSubmitting = false;
        },
      });
    }
  }

  deletePenulis(_id: string): void {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const token = localStorage.getItem('authToken');
      const headers = { Authorization: `Bearer ${token}` };

      this.http.delete(`${this.apiUrl}/${_id}`, { headers }).subscribe({
        next: () => {
          console.log(`Penulis dengan ID ${_id} berhasil dihapus`);
          this.getPenulis();
        },
        error: (err) => {
          console.error('Error menghapus penulis:', err);
        }
      });
    }
  }

  getPenulisById(_id: string): void {
    this.editPenulisId = _id;
    this.http.get(`${this.apiUrl}/${_id}`).subscribe({
      next: (data: any) => {
        this.penulisForm.patchValue({
          nama: data.nama,
          email: data.email,
          profilSingkat: data.profilSingkat,
          fotoProfil: data.fotoProfil,
          spesialisasi: data.spesialisasi,
          status: data.status
        });
        this.openModal('editPenulisModal');
      },
      error: (err) => {
        console.error('Error fetching penulis data by ID:', err);
      },
    });
  }

  updatePenulis(): void {
    if (this.penulisForm.valid) {
      this.isSubmitting = true;

      const token = localStorage.getItem('authToken');
      const headers = { Authorization: `Bearer ${token}` };

      this.http.put(`${this.apiUrl}/${this.editPenulisId}`, this.penulisForm.value, { headers }).subscribe({
        next: (response) => {
          console.log('Penulis berhasil diperbarui:', response);
          this.getPenulis();
          this.isSubmitting = false;
          this.closeModal('editPenulisModal');
        },
        error: (err) => {
          console.error('Error updating penulis:', err);
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