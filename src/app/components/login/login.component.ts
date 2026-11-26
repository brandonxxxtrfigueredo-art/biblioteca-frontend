import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  esRegistro = signal(false);
  cargando = signal(false);
  error = signal('');
  nombre = '';
  correo = '';
  password = '';

  autocompletar(correo: string, pass: string) {
    this.esRegistro.set(false);
    this.correo = correo;
    this.password = pass;
  }

  enviar() {
    this.cargando.set(true);
    this.error.set('');
    const req$ = this.esRegistro()
      ? this.auth.registrar(this.nombre, this.correo, this.password)
      : this.auth.login(this.correo, this.password);

    req$.subscribe({
      next: (res) => {
        this.cargando.set(false);
        this.router.navigate([res.usuario.rol === 'admin' ? '/admin' : '/catalogo']);
      },
      error: (err) => {
        this.cargando.set(false);
        this.error.set(err.error?.detail || 'Credenciales inválidas.');
      }
    });
  }
}
