import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Autor, Categoria, Estadisticas, Libro, Prestamo, Usuario } from '../../models/biblioteca.models';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  private biblio = inject(BibliotecaService);
  tab = signal<'stats' | 'libros' | 'autores' | 'categorias' | 'prestamos' | 'usuarios'>('stats');
  error = signal('');

  stats = signal<Estadisticas | null>(null);
  libros = signal<Libro[]>([]);
  autores = signal<Autor[]>([]);
  categorias = signal<Categoria[]>([]);
  prestamos = signal<Prestamo[]>([]);
  usuarios = signal<Usuario[]>([]);

  nuevoLibro = { titulo: '', isbn: '', ejemplares_totales: 1, autor_id: 0, categoria_id: 0 };
  nuevoAutor = { nombre: '', nacionalidad: '' };
  nuevaCat = { nombre: '', descripcion: '' };

  ngOnInit() { this.cargarTodo(); }

  cargarTodo() {
    this.biblio.getEstadisticas().subscribe((d) => this.stats.set(d));
    this.biblio.getLibros().subscribe((d) => this.libros.set(d));
    this.biblio.getAutores().subscribe((d) => this.autores.set(d));
    this.biblio.getCategorias().subscribe((d) => this.categorias.set(d));
    this.biblio.getTodosPrestamos().subscribe((d) => this.prestamos.set(d));
    this.biblio.getUsuarios().subscribe((d) => this.usuarios.set(d));
  }

  guardarLibro() {
    this.error.set('');
    this.biblio.crearLibro(this.nuevoLibro).subscribe({
      next: () => { this.nuevoLibro = { titulo: '', isbn: '', ejemplares_totales: 1, autor_id: 0, categoria_id: 0 }; this.cargarTodo(); },
      error: (e) => this.error.set(e.error?.detail || 'Error al crear libro')
    });
  }
  eliminarLibro(id: number) { this.biblio.eliminarLibro(id).subscribe({ next: () => this.cargarTodo(), error: (e) => this.error.set(e.error?.detail || 'Error') }); }

  guardarAutor() {
    this.biblio.crearAutor(this.nuevoAutor).subscribe({
      next: () => { this.nuevoAutor = { nombre: '', nacionalidad: '' }; this.cargarTodo(); },
      error: (e) => this.error.set(e.error?.detail || 'Error al crear autor')
    });
  }
  eliminarAutor(id: number) { this.biblio.eliminarAutor(id).subscribe({ next: () => this.cargarTodo(), error: (e) => this.error.set(e.error?.detail || 'Error') }); }

  guardarCategoria() {
    this.biblio.crearCategoria(this.nuevaCat).subscribe({
      next: () => { this.nuevaCat = { nombre: '', descripcion: '' }; this.cargarTodo(); },
      error: (e) => this.error.set(e.error?.detail || 'Error al crear categoría')
    });
  }
  eliminarCategoria(id: number) { this.biblio.eliminarCategoria(id).subscribe({ next: () => this.cargarTodo(), error: (e) => this.error.set(e.error?.detail || 'Error') }); }

  devolverPrestamo(id: number) { this.biblio.devolverLibro(id).subscribe(() => this.cargarTodo()); }
}
