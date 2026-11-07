import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlumnosUtl } from '../alumnosUtl';

import { Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../../proyectoapi.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-agregar',
  templateUrl: './agregar.html',
})
export class Agregar implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public alumnosutl: ProyectoapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const valores = this.formGroup.getRawValue();

    // El input type="number" entrega un número; la interfaz espera string
    const datos: AlumnosUtl = {
      ...valores,
      matricula: String(valores.matricula)
    };

    this.alumnosutl.agregarNuevoAlumno(datos).subscribe({
      next: (respuesta) => {
        if (respuesta?.exito === false) {
          alert(respuesta.mensaje || 'No se pudo registrar el alumno');
          return;
        }

        alert('Alumno registrado correctamente');
        this.formGroup.reset();
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al registrar alumno:', error);

        const mensaje =
          error.error?.mensaje ||
          error.error?.error ||
          error.message ||
          'Ocurrió un error al registrar el alumno';

        alert(mensaje);
      }
    });
  }
}