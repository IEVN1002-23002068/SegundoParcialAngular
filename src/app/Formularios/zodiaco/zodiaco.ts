import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-zodiaco',
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html',
})
export class Zodiaco {

  nombre: string = '';
  paterno: string = '';
  materno: string = '';

  dia: string = '';
  mes: string = '';
  anio: string = '';

  sexo: string = '';

  edad: number = 0;
  signo: string = '';
  imagenSigno: string = '';

  mostrar: boolean = false;

  signos = [
    {
      nombre: 'Rata',
      imagen: 'https://www.horoscopo.com/img/signs/rata.png',
    },
    {
      nombre: 'Buey',
      imagen: 'https://www.horoscopo.com/img/signs/buey.png',
    },
    {
      nombre: 'Tigre',
      imagen: 'https://www.horoscopo.com/img/signs/tigre.png',
    },
    {
      nombre: 'Liebre',
      imagen: 'https://www.horoscopo.com/img/signs/liebre.png',
    },
    {
      nombre: 'Dragón',
      imagen: 'https://www.horoscopo.com/img/signs/drag%C3%B3n.png',
    },
    {
      nombre: 'Serpiente',
      imagen: 'https://www.horoscopo.com/img/signs/serpiente.png',
    },
    {
      nombre: 'Caballo',
      imagen: 'https://www.horoscopo.com/img/signs/caballo.png',
    },
    {
      nombre: 'Cabra',
      imagen: 'https://www.horoscopo.com/img/signs/cabra.png',
    },
    {
      nombre: 'Mono',
      imagen: 'https://www.horoscopo.com/img/signs/mono.png',
    },
    {
      nombre: 'Gallo',
      imagen: 'https://www.horoscopo.com/img/signs/gallo.png',
    },
    {
      nombre: 'Perro',
      imagen: 'https://www.horoscopo.com/img/signs/perro.png',
    },
    {
      nombre: 'Cerdo',
      imagen: 'https://www.horoscopo.com/img/signs/cerdo.png',
    }
  ];

 imprimir(): void {

  let anioNacimiento = parseInt(this.anio);
  this.edad = 2026 - anioNacimiento;
  
  let posicion = (anioNacimiento - 4) % 12;

  this.signo = this.signos[posicion].nombre;
  this.imagenSigno = this.signos[posicion].imagen;

  this.mostrar = true;
}
}