import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sumber', // Ubah selector menjadi app-sumber
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sumber.component.html', // Ubah nama file template menjadi sumber.component.html
  styleUrl: './sumber.component.css' // Ubah nama file style menjadi sumber.component.css
})
export class SumberComponent implements OnInit {
  sumber: any[] = []; // Ubah nama variabel menjadi sumber
  apiUrl = 'https://uas-backend-iota.vercel.app/api/sumber'; // Ganti URL API dengan endpoint untuk sumber
  isLoading = true;

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.sumber = data;
        console.log('Data Sumber:', this.sumber); // Ubah pesan log menjadi 'Data Sumber:'
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching sumber data:', err); // Ubah pesan error menjadi 'Error fetching sumber data:'
        this.isLoading = false;
      },
    });
  }
}