import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-kategori', // Ubah selector menjadi app-kategori
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kategori.component.html', // Ubah nama file template menjadi kategori.component.html
  styleUrl: './kategori.component.css' // Ubah nama file style menjadi kategori.component.css
})
export class KategoriComponent implements OnInit {
  kategori: any[] = []; // Ubah nama variabel menjadi kategori
  apiUrl = 'https://uas-backend-iota.vercel.app/api/kategori'; // Ganti URL API dengan endpoint untuk kategori
  isLoading = true;

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.kategori = data;
        console.log('Data Kategori:', this.kategori); // Ubah pesan log menjadi 'Data Kategori:'
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching kategori data:', err); // Ubah pesan error menjadi 'Error fetching kategori data:'
        this.isLoading = false;
      },
    });
  }
}