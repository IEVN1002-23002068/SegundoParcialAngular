import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProyectoapiService } from '../proyectoapi.service';
import { MaestrosFilterPipe } from './maestros-filter.pipe';

@Component({
  selector: 'app-maestros',
  imports: [FormsModule, RouterLink, MaestrosFilterPipe, CommonModule],
  templateUrl: './maestros.html',
})
export class Maestros implements OnInit {

  listFilter: string = '';
  dataSource: any = [];

  constructor(
    public maestrosUTL: ProyectoapiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.maestrosUTL.getMaestros().subscribe({
      next: (resp) => {
        this.dataSource = resp.maestros ?? [];
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error:', err),
    });
  }

  eliminarMaestro(id: any): void {
    if (!confirm(`¿Eliminar al maestro con ID ${id}?`)) {
      return;
    }

    this.maestrosUTL.EliminaMaestro(id).subscribe({
      next: (resp) => {
        if (resp?.exito === false) {
          alert(resp.mensaje || 'No se pudo eliminar el maestro');
          return;
        }

        this.dataSource = this.dataSource.filter(
          (m: any) => String(m.idmaestro) !== String(id)
        );
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert('Ocurrió un error al eliminar el maestro');
      },
    });
  }
}