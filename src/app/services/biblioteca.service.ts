import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Autor, Categoria, Estadisticas, Libro, Prestamo, Usuario } from '../models/biblioteca.models';

@Injectable({ providedIn: 'root' })
export class BibliotecaService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getLibros(filtros?: { buscar?: string; autor_id?: number; categoria_id?: number; solo_disponibles?: boolean }) {
    let params = new HttpParams();
    if (filtros?.buscar) params = params.set('buscar', filtros.buscar);
    if (filtros?.autor_id) params = params.set('autor_id', filtros.autor_id);
    if (filtros?.categoria_id) params = params.set('categoria_id', filtros.categoria_id);
    if (filtros?.solo_disponibles) params = params.set('solo_disponibles', true);
    return this.http.get<Libro[]>(`${this.base}/libros`, { params });
  }
  crearLibro(data: any) { return this.http.post<Libro>(`${this.base}/libros`, data); }
  eliminarLibro(id: number) { return this.http.delete(`${this.base}/libros/${id}`); }

  getAutores() { return this.http.get<Autor[]>(`${this.base}/autores`); }
  crearAutor(data: any) { return this.http.post<Autor>(`${this.base}/autores`, data); }
  eliminarAutor(id: number) { return this.http.delete(`${this.base}/autores/${id}`); }

  getCategorias() { return this.http.get<Categoria[]>(`${this.base}/categorias`); }
  crearCategoria(data: any) { return this.http.post<Categoria>(`${this.base}/categorias`, data); }
  eliminarCategoria(id: number) { return this.http.delete(`${this.base}/categorias/${id}`); }

  getTodosPrestamos() { return this.http.get<Prestamo[]>(`${this.base}/prestamos`); }
  getMisPrestamos() { return this.http.get<Prestamo[]>(`${this.base}/prestamos/mis-prestamos`); }
  pedirPrestamo(libro_id: number, dias = 14) { return this.http.post<Prestamo>(`${this.base}/prestamos`, { libro_id, dias }); }
  devolverLibro(id: number) { return this.http.put<Prestamo>(`${this.base}/prestamos/${id}/devolver`, {}); }

  getUsuarios() { return this.http.get<Usuario[]>(`${this.base}/usuarios`); }
  getEstadisticas() { return this.http.get<Estadisticas>(`${this.base}/estadisticas`); }
}
