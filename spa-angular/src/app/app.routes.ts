import { Routes } from '@angular/router';
import { KategoriComponent } from './components/kategori/kategori.component';
import { BeritaComponent } from './components/berita/berita.component';
import { PenulisComponent } from './components/penulis/penulis.component';
import { SumberComponent } from './components/sumber/sumber.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './auth.guard'; // Import AuthGuard with correct casing

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'kategori', component: KategoriComponent, canActivate: [authGuard] }, 
    { path: 'berita', component: BeritaComponent, canActivate: [authGuard] }, 
    { path: 'penulis', component: PenulisComponent, canActivate: [authGuard] }, 
    { path: 'sumber', component: SumberComponent, canActivate: [authGuard] }, 
    { path: 'auth', component: AuthComponent },
    { path: '**', redirectTo: 'auth' }, 
];