import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MaestrosUtl } from '../maestros-utl';
import { ProyectoapiService } from '../../proyectoapi.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-editar-maestro',
  templateUrl: './editar.html',
})
export class EditarMaestro implements OnInit {
  formulario!: FormGroup;
  idmaestro: string = '';

  constructor(
    private route: ActivatedRoute,
    public maestrosUtl: ProyectoapiService,
    public fb: FormBuilder,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      idmaestro: [''],
      nombre: ['', Validators.required],
      apaterno: [''],
      amaterno: [''],
      correo: ['', Validators.email]
    });

    this.idmaestro = this.route.snapshot.paramMap.get('idmaestro') || '';

    this.maestrosUtl.getMaestro(this.idmaestro).subscribe({
      next: (response) => {
        this.formulario.patchValue(response.maestro ?? response);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al consultar el maestro:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valores = this.formulario.getRawValue();

    const maestro: MaestrosUtl = {
      ...valores,
      idmaestro: Number(this.idmaestro)
    };

    this.maestrosUtl.modificarMaestro(this.idmaestro, maestro).subscribe({
      next: (response) => {
        if (response?.exito === false) {
          alert(response.mensaje || 'No se pudo actualizar el maestro');
          return;
        }

        alert('Maestro actualizado correctamente');
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        alert('Ocurrió un error al actualizar el maestro');
      }
    });
  }
}