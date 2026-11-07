import { AlumnosUtl } from '../alumnosUtl';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../../proyectoapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-editar',
  templateUrl: './editar.html',
})
export class Editar implements OnInit {
  formulario!: FormGroup;
  matricula: string = '';

  constructor(
    private route: ActivatedRoute,
    public alumnosUtl: ProyectoapiService,
    public fb: FormBuilder,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });

    this.matricula = this.route.snapshot.paramMap.get('matricula') || '';

    this.alumnosUtl.getAlumno(this.matricula).subscribe({
      next: (response) => {
        this.formulario.patchValue(response.alumno ?? response);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al consultar el alumno:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valores = this.formulario.getRawValue();

    const alumno: AlumnosUtl = {
      ...valores,
      matricula: String(valores.matricula)
    };

    this.alumnosUtl.modificarAlumno(this.matricula, alumno).subscribe({
      next: (response) => {
        if (response?.exito === false) {
          alert(response.mensaje || 'No se pudo actualizar el alumno');
          return;
        }

        alert('Alumno actualizado correctamente');
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        alert('Ocurrió un error al actualizar el alumno');
      }
    });
  }
}