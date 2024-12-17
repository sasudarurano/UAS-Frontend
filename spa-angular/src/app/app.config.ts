// Mengimpor ApplicationConfig dan fungsi optimasi perubahan zona dari Angular core
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

// Mengimpor fungsi untuk menyediakan routing di aplikasi Angular
import { provideRouter } from '@angular/router';

// Mengimpor fungsi untuk menyediakan layanan HTTP di aplikasi Angular
import { provideHttpClient } from '@angular/common/http';

// Mengimpor konfigurasi rute yang sudah didefinisikan di file app.routes.ts
import { routes } from './app.routes';

// Mendefinisikan konfigurasi aplikasi Angular
export const appConfig: ApplicationConfig = {
  // Bagian providers digunakan untuk mendaftarkan layanan yang digunakan di seluruh aplikasi
  providers: [
    // Mengoptimalkan deteksi perubahan dengan mengaktifkan event coalescing,
    // yang mengurangi frekuensi deteksi perubahan untuk meningkatkan performa.
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Menyediakan layanan routing dengan konfigurasi yang diambil dari file routes
    provideRouter(routes),

    // Menyediakan layanan HttpClient untuk memungkinkan permintaan HTTP (GET, POST, dll.)
    provideHttpClient()
  ]
};
