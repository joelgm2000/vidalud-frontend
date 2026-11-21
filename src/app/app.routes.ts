import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { LegalPage } from './pages/legal-page/legal-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'terminos', component: LegalPage, data: { doc: 'terms' } },
  { path: 'privacidad', component: LegalPage, data: { doc: 'privacy' } },
  { path: '**', redirectTo: '' },
];
