import { Pipe, PipeTransform } from '@angular/core';
import { AlumnosUtl } from './alumnosUtl';

@Pipe({
  name: 'alumnosFilter',
})
export class AlumnosFilterPipe implements PipeTransform {
  transform(value: AlumnosUtl[], args: string): AlumnosUtl[] {
    if (!value) return [];

    const filter = args ? args.toLowerCase() : '';

    return filter
      ? value.filter((alumno: AlumnosUtl) =>
          (alumno.nombre ?? '').toLowerCase().includes(filter)
        )
      : value;
  }
}