import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaestrosUtl } from '../maestros-utl';
import { ProyectoapiService } from '../../proyectoapi.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-agregar-maestro',
  templateUrl: './agregar.html',
})
export class AgregarMaestro implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public maestrosutl: ProyectoapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Sin idmaestro: lo genera MySQL
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      apaterno: [''],
      amaterno: [''],
      correo: ['', Validators.email]
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const datos: MaestrosUtl = this.formGroup.getRawValue();

    this.maestrosutl.agregarNuevoMaestro(datos).subscribe({
      next: (respuesta) => {
        if (respuesta?.exito === false) {
          alert(respuesta.mensaje || 'No se pudo registrar el maestro');
          return;
        }

        alert('Maestro registrado correctamente');
        this.formGroup.reset();
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al registrar maestro:', error);

        const mensaje =
          error.error?.mensaje ||
          error.error?.error ||
          error.message ||
          'Ocurrió un error al registrar el maestro';

        alert(mensaje);
      }
    });
  }
}