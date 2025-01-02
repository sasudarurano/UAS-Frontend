import { CommonModule } from '@angular/common';  // Mengimpor CommonModule agar dapat menggunakan fitur-fitur dasar Angular seperti *ngIf dan *ngFor
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';  // Mengimpor RouterModule
import { RouterOutlet } from '@angular/router';  // Mengimpor RouterOutlet
import { Router } from '@angular/router';  // Mengimpor Router

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterModule, CommonModule], // Menambahkan RouterOutlet, RouterModule
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  title = 'spa-angular';

  isLoggedIn: boolean = false; // Menyimpan status login
  constructor(private router: Router) { } // Menambahkan router pada konstruktor
  
  ngOnInit() {
    // Memeriksa apakah ada token di localStorage
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  onLogout() {
    // Menghapus token dari localStorage saat logout
    localStorage.removeItem('authToken');
    this.isLoggedIn = false; // Mengubah status login menjadi false
    this.router.navigate(['/auth']); // Arahkan ke halaman login setelah logout
  }
}
