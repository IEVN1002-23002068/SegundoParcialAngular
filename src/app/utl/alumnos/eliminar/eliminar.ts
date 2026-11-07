import { AlumnosUtl } from '../alumnosUtl';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../../proyectoapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-eliminar',
  templateUrl: './eliminar.html',
})
export class Eliminar implements OnInit {
  matricula: string = '';
  regAlumno: AlumnosUtl = {
    matricula: '',
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private route: ActivatedRoute,
    public alumnosUtl: ProyectoapiService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.matricula = this.route.snapshot.paramMap.get('matricula') || '';

    this.alumnosUtl.getAlumno(this.matricula).subscribe({
      next: (response) => {
        this.regAlumno = response.alumno ?? response;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al consultar el alumno:', error);
      }
    });
  }

  eliminar(): void {
    this.alumnosUtl.EliminaAlumno(this.matricula).subscribe({
      next: (response) => {
        if (response?.exito === false) {
          alert(response.mensaje || 'No se pudo eliminar el alumno');
          return;
        }

        alert('Alumno eliminado correctamente');
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
        alert('Ocurrió un error al eliminar el alumno');
      }
    });
  }
}