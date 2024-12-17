import { Routes } from '@angular/router';
import { KategoriComponent } from './components/kategori/kategori.component';
import { BeritaComponent } from './components/berita/berita.component';
import { PenulisComponent } from './components/penulis/penulis.component';
import { SumberComponent } from './components/sumber/sumber.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'kategori', component: KategoriComponent },
    { path: 'berita', component: BeritaComponent },
    { path: 'penulis', component: PenulisComponent },
    { path: 'sumber', component: SumberComponent }
];