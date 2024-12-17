import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-penulis', // Ubah selector menjadi app-penulis
  standalone: true,
  imports: [CommonModule],
  templateUrl: './penulis.component.html', // Ubah nama file template menjadi penulis.component.html
  styleUrl: './penulis.component.css' // Ubah nama file style menjadi penulis.component.css
})
export class PenulisComponent implements OnInit {
  penulis: any[] = []; // Ubah nama variabel menjadi penulis
  apiUrl = 'https://uas-backend-iota.vercel.app/api/penulis'; // Ganti URL API dengan endpoint untuk penulis
  isLoading = true;

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.penulis = data;
        console.log('Data Penulis:', this.penulis); // Ubah pesan log menjadi 'Data Penulis:'
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching penulis data:', err); // Ubah pesan error menjadi 'Error fetching penulis data:'
        this.isLoading = false;
      },
    });
  }
}
