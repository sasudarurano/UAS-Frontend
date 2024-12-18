import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-sumber',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './sumber.component.html',
  styleUrl: './sumber.component.css'
})
export class SumberComponent implements OnInit {
  sumber: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  apiUrl = 'https://uas-backend-iota.vercel.app/api/sumber';
  isLoading = true;
  sumberForm: FormGroup;
  isSubmitting = false;
  editSumberId: string | null = null;

  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  constructor() {
    this.sumberForm = this.fb.group({
      nama: ['', Validators.required],
      jenisSumber: ['Wawancara', Validators.required], // Default value 'Wawancara'
      urlReferensi: [''],
      tanggalAkses: ['', Validators.required],
      kredibilitas: ['Tinggi', Validators.required] // Default value 'Tinggi'
    });
  }

  ngOnInit(): void {
    this.getSumber();
  }

  getSumber(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.sumber = data;
        console.log('Data Sumber:', this.sumber);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching sumber data:', err);
        this.isLoading = false;
      },
    });
  }

  addSumber(): void {
    if (this.sumberForm.valid) {
      this.isSubmitting = true;
      const token = localStorage.getItem('authToken');
      const headers = { Authorization: `Bearer ${token}` };

      this.http.post(this.apiUrl, this.sumberForm.value, { headers }).subscribe({
        next: (response) => {
          console.log('Data berhasil ditambahkan:', response);
          this.getSumber();
          this.sumberForm.reset({
            jenisSumber: 'Wawancara', // Reset to default value
            kredibilitas: 'Tinggi' // Reset to default value
          });
          this.isSubmitting = false;
          this.closeModal('tambahSumberModal');
        },
        error: (err) => {
          console.error('Error menambahkan sumber:', err);
          this.isSubmitting = false;
        },
      });
    }
  }

  deleteSumber(_id: string): void {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const token = localStorage.getItem('authToken');
      const headers = { Authorization: `Bearer ${token}` };

      this.http.delete(`${this.apiUrl}/${_id}`, { headers }).subscribe({
        next: () => {
          console.log(`Sumber dengan ID ${_id} berhasil dihapus`);
          this.getSumber();
        },
        error: (err) => {
          console.error('Error menghapus sumber:', err);
        }
      });
    }
  }

  getSumberById(_id: string): void {
    this.editSumberId = _id;
    this.http.get(`${this.apiUrl}/${_id}`).subscribe({
      next: (data: any) => {
        this.sumberForm.patchValue(data);
        this.openModal('editSumberModal');
      },
      error: (err) => {
        console.error('Error fetching sumber data by ID:', err);
      },
    });
  }

  updateSumber(): void {
    if (this.sumberForm.valid) {
      this.isSubmitting = true;
      const token = localStorage.getItem('authToken');
      const headers = { Authorization: `Bearer ${token}` };

      this.http.put(`${this.apiUrl}/${this.editSumberId}`, this.sumberForm.value, { headers }).subscribe({
        next: (response) => {
          console.log('Sumber berhasil diperbarui:', response);
          this.getSumber();
          this.isSubmitting = false;
          this.closeModal('editSumberModal');
        },
        error: (err) => {
          console.error('Error updating sumber:', err);
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