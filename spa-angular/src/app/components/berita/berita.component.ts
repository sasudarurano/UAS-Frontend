import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-berita', // Ubah selector menjadi app-berita
  standalone: true,
  imports: [CommonModule],
  templateUrl: './berita.component.html', // Ubah nama file template menjadi berita.component.html
  styleUrl: './berita.component.css' // Ubah nama file style menjadi berita.component.css
})
export class BeritaComponent implements OnInit {
  berita: any[] = []; // Ubah nama variabel menjadi berita
  apiUrl = 'https://uas-backend-iota.vercel.app/api/berita'; // Ganti URL API dengan endpoint untuk berita
  isLoading = true;

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.berita = data;
        console.log('Data Berita:', this.berita); // Ubah pesan log menjadi 'Data Berita:'
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching berita data:', err); // Ubah pesan error menjadi 'Error fetching berita data:'
        this.isLoading = false;
      },
    });
  }
}