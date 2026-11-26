import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => inject(AuthService).estaAutenticado() ? true : inject(Router).createUrlTree(['/login']);
export const adminGuard: CanActivateFn = () => inject(AuthService).esAdmin() ? true : inject(Router).createUrlTree(['/catalogo']);
