import { Component, OnInit, inject, signal } from '@angular/core';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Prestamo } from '../../models/biblioteca.models';

@Component({
  selector: 'app-mis-prestamos',
  standalone: true,
  templateUrl: './mis-prestamos.component.html',
  styleUrl: './mis-prestamos.component.css'
})
export class MisPrestamosComponent implements OnInit {
  private biblioService = inject(BibliotecaService);
  prestamos = signal<Prestamo[]>([]);

  ngOnInit() { this.cargar(); }
  cargar() { this.biblioService.getMisPrestamos().subscribe((d) => this.prestamos.set(d)); }
  devolver(id: number) { this.biblioService.devolverLibro(id).subscribe(() => this.cargar()); }
}
