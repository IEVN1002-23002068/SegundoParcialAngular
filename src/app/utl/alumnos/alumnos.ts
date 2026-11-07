
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProyectoapiService } from '../proyectoapi.service';
import { AlumnosFilterPipe } from './alumnos-filter.pipe';
import { CommonModule } from '@angular/common';
import { AlumnosUtl } from './alumnosUtl';

@Component({
  selector: 'app-alumnos',
  imports: [FormsModule, RouterLink, AlumnosFilterPipe, CommonModule],
  templateUrl: './alumnos.html',
})
export class Alumnos implements OnInit {

  imageWidth: number = 50;
  imageMargin: number = 2;
  muestraImage: boolean = true;
  listFilter: string = '';
  alumnoTittle!: string;
  dataSource: any = [];

  constructor(
    public alumnosUTL: ProyectoapiService,
    private cdr: ChangeDetectorRef
  ) {}

  alumnosIric: AlumnosUtl[] = [{
    matricula: '1234',
    nombre: 'Luis',
    apaterno: 'Lopez',
    amaterno: 'Martinez',
    correo: 'luis@gmail.com'
  }];

  ngOnInit(): void {
    this.alumnosUTL.getAlumnos().subscribe({
      next: (resp) => {
        console.log('Respuesta de Flask:', resp);

        this.dataSource = resp.alumnos ?? [];

        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al obtener alumnos:', err);
      }
    });
  }

}
