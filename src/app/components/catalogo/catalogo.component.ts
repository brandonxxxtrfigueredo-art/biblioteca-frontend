import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca.service';
import { AuthService } from '../../services/auth.service';
import { Autor, Categoria, Libro } from '../../models/biblioteca.models';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  private biblioService = inject(BibliotecaService);
  private auth = inject(AuthService);
  private router = inject(Router);

  libros = signal<Libro[]>([]);
  autores = signal<Autor[]>([]);
  categorias = signal<Categoria[]>([]);
  mensaje = signal('');
  esError = signal(false);

  buscar = '';
  autorId?: number;
  categoriaId?: number;
  soloDisponibles = false;

  ngOnInit() {
    this.cargarLibros();
    this.biblioService.getAutores().subscribe((d) => this.autores.set(d));
    this.biblioService.getCategorias().subscribe((d) => this.categorias.set(d));
  }

  cargarLibros() {
    this.biblioService.getLibros({
      buscar: this.buscar, autor_id: this.autorId, categoria_id: this.categoriaId, solo_disponibles: this.soloDisponibles
    }).subscribe((d) => this.libros.set(d));
  }

  pedirPrestado(libro: Libro) {
    if (!this.auth.estaAutenticado()) { this.router.navigate(['/login']); return; }
    this.biblioService.pedirPrestamo(libro.id, 14).subscribe({
      next: () => {
        this.esError.set(false);
        this.mensaje.set(`Préstamo registrado por 14 días: "${libro.titulo}".`);
        this.cargarLibros();
      },
      error: (err) => {
        this.esError.set(true);
        this.mensaje.set(err.error?.detail || 'No se pudo procesar el préstamo.');
      }
    });
  }
}
