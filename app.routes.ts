import { Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { LoginComponent } from './components/login/login.component';
import { MisPrestamosComponent } from './components/mis-prestamos/mis-prestamos.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { adminGuard, authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mis-prestamos', component: MisPrestamosComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: 'catalogo' }
];
