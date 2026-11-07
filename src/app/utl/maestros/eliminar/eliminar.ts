import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MaestrosUtl } from '../maestros-utl';
import { ProyectoapiService } from '../../proyectoapi.service';

@Component({
  imports: [RouterLink],
  selector: 'app-eliminar-maestro',
  templateUrl: './eliminar.html',
})
export class EliminarMaestro implements OnInit {
  idmaestro: string = '';
  regMaestro: MaestrosUtl = {
    idmaestro: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private route: ActivatedRoute,
    public maestrosUtl: ProyectoapiService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.idmaestro = this.route.snapshot.paramMap.get('idmaestro') || '';

    this.maestrosUtl.getMaestro(this.idmaestro).subscribe({
      next: (response) => {
        this.regMaestro = response.maestro ?? response;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al consultar el maestro:', error);
      }
    });
  }

  eliminar(): void {
    this.maestrosUtl.EliminaMaestro(this.idmaestro).subscribe({
      next: (response) => {
        if (response?.exito === false) {
          alert(response.mensaje || 'No se pudo eliminar el maestro');
          return;
        }

        alert('Maestro eliminado correctamente');
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
        alert('Ocurrió un error al eliminar el maestro');
      }
    });
  }
}