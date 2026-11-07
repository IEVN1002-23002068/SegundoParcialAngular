import { Pipe, PipeTransform } from '@angular/core';
import { MaestrosUtl } from './maestros-utl';

@Pipe({
  name: 'maestrosFilter',
})
export class MaestrosFilterPipe implements PipeTransform {
  transform(value: MaestrosUtl[], args: string): MaestrosUtl[] {
    if (!value) return [];

    const filter = args ? args.toLowerCase() : '';

    return filter
      ? value.filter((maestro: MaestrosUtl) =>
          (maestro.nombre ?? '').toLowerCase().includes(filter)
        )
      : value;
  }
}