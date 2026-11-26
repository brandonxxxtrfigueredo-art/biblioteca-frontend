import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenResponse, Usuario } from '../models/biblioteca.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = `${environment.apiUrl}/auth`;

  private usuarioSignal = signal<Usuario | null>(this.obtenerUsuarioGuardado());
  usuario = this.usuarioSignal.asReadonly();
  estaAutenticado = computed(() => !!this.usuarioSignal());
  esAdmin = computed(() => this.usuarioSignal()?.rol === 'admin');

  login(correo: string, password: string) {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, { correo, password })
      .pipe(tap((res) => this.guardarSesion(res)));
  }

  registrar(nombre: string, correo: string, password: string) {
    return this.http.post<TokenResponse>(`${this.apiUrl}/registro`, { nombre, correo, password })
      .pipe(tap((res) => this.guardarSesion(res)));
  }

  private guardarSesion(res: TokenResponse) {
    localStorage.setItem('access_token', res.access_token);
    localStorage.setItem('usuario', JSON.stringify(res.usuario));
    this.usuarioSignal.set(res.usuario);
  }

  obtenerToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  }

  cerrarSesion() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('usuario');
    this.usuarioSignal.set(null);
    this.router.navigate(['/login']);
  }

  private obtenerUsuarioGuardado(): Usuario | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('usuario');
    return raw ? JSON.parse(raw) : null;
  }
}
