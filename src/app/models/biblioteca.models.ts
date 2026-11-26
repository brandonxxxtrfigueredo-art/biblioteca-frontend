export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: 'admin' | 'lector';
  activo: boolean;
  fecha_registro: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  usuario: Usuario;
}

export interface Autor {
  id: number;
  nombre: string;
  nacionalidad?: string | null;
  fecha_nacimiento?: string | null;
  biografia?: string | null;
  total_libros?: number;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string | null;
  total_libros?: number;
}

export interface Libro {
  id: number;
  titulo: string;
  isbn: string;
  anio_publicacion?: number | null;
  paginas?: number | null;
  sinopsis?: string | null;
  portada_url?: string | null;
  ejemplares_totales: number;
  ejemplares_disponibles: number;
  autor: { id: number; nombre: string };
  categoria: { id: number; nombre: string };
}

export interface Prestamo {
  id: number;
  fecha_prestamo: string;
  fecha_limite: string;
  fecha_devolucion?: string | null;
  estado: 'activo' | 'vencido' | 'devuelto';
  usuario: { id: number; nombre: string; correo: string };
  libro: { id: number; titulo: string; portada_url?: string | null };
}

export interface Estadisticas {
  total_libros: number;
  total_ejemplares: number;
  ejemplares_disponibles: number;
  total_autores: number;
  total_categorias: number;
  total_usuarios: number;
  prestamos_activos: number;
  prestamos_vencidos: number;
  prestamos_devueltos: number;
  libros_mas_prestados: { id: number; titulo: string; portada_url?: string | null; total_prestamos: number }[];
  libros_por_categoria: { categoria: string; total_libros: number }[];
}
