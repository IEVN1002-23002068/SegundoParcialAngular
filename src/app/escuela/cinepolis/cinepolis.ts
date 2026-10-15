import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { VerRegistros } from '../ver-registros/ver-registros';

@Component({
  selector: 'app-cinepolis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, VerRegistros],
  templateUrl: './cinepolis.html',
  styleUrl: './cinepolis.css'
})
export class Cinepolis implements OnInit {

  formularios!: FormGroup;

  mostrar = false;
  mensaje = '';

  nombreComprador = '';
  cantidadCompradores = 0;
  cantidadBoletos = 0;
  importeOriginal = 0;
  importeDescuento = 0;
  totalPagar = 0;

  verVistaRegistros = false;

  ngOnInit(): void {
    this.formularios = new FormGroup({
      nombre: new FormControl(''),
      compradores: new FormControl(1),
      cineco: new FormControl('no'),
      boletos: new FormControl(1)
    });
  }

  procesar(): void {
    const nombre = String(this.formularios.get('nombre')?.value ?? '').trim();
    const compradores = Number(this.formularios.get('compradores')?.value);
    const cineco = String(this.formularios.get('cineco')?.value ?? 'no');
    const boletos = Number(this.formularios.get('boletos')?.value);

    // Validaciones manuales, sin Validators
    if (nombre === '') {
      this.mensaje = 'Escribe el nombre del comprador.';
      this.mostrar = false;
      return;
    }

    if (!Number.isInteger(compradores) || compradores < 1) {
      this.mensaje = 'La cantidad de compradores debe ser por lo menos 1.';
      this.mostrar = false;
      return;
    }

    if (!Number.isInteger(boletos) || boletos < 1) {
      this.mensaje = 'La cantidad de boletos debe ser por lo menos 1.';
      this.mostrar = false;
      return;
    }

    if (boletos > compradores * 7) {
      this.mensaje = 'No se pueden comprar más de 7 boletos por comprador.';
      this.mostrar = false;
      return;
    }

    const precioBoleto = 12;
    const importeOriginal = boletos * precioBoleto;

    let porcentajeDescuento = 0;

    if (boletos > 5) {
      porcentajeDescuento = 0.15;
    } else if (boletos >= 3) {
      porcentajeDescuento = 0.10;
    }

    const descuentoBoletos = importeOriginal * porcentajeDescuento;
    let total = importeOriginal - descuentoBoletos;

    // Se aplica un 10% adicional si cuenta con tarjeta Cineco
    let descuentoCineco = 0;

    if (cineco === 'si') {
      descuentoCineco = total * 0.10;
      total = total - descuentoCineco;
    }

    const descuentoTotal = descuentoBoletos + descuentoCineco;

    this.nombreComprador = nombre;
    this.cantidadCompradores = compradores;
    this.cantidadBoletos = boletos;
    this.importeOriginal = importeOriginal;
    this.importeDescuento = descuentoTotal;
    this.totalPagar = total;

    this.mensaje = 'La venta se registró correctamente.';
    this.mostrar = true;

    // Recuperar las ventas que ya existen
    const datosGuardados = localStorage.getItem('ventasCinepolis');
    const ventas = datosGuardados ? JSON.parse(datosGuardados) : [];

    // Crear el nuevo registro
    const nuevaVenta = {
      id: Date.now(),
      nombre: nombre,
      compradores: compradores,
      cineco: cineco,
      boletos: boletos,
      importeOriginal: importeOriginal,
      descuento: descuentoTotal,
      total: total,
      fecha: new Date().toLocaleString()
    };

    // Guardar la venta
    ventas.push(nuevaVenta);
    localStorage.setItem('ventasCinepolis', JSON.stringify(ventas));
  }

  verRegistros(): void {
    this.verVistaRegistros = true;
  }

  volverCinepolis(): void {
    this.verVistaRegistros = false;
  }

  limpiar(): void {
    this.formularios.reset({
      nombre: '',
      compradores: 1,
      cineco: 'no',
      boletos: 1
    });

    this.mostrar = false;
    this.mensaje = '';
  }
  
}