import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';

interface Venta {
  id: number;
  nombre: string;
  compradores: number;
  cineco: string;
  boletos: number;
  importeOriginal: number;
  descuento: number;
  total: number;
  fecha: string;
}

@Component({
  selector: 'app-ver-registros',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ver-registros.html',
  styleUrl: './ver-registros.css'
})
export class VerRegistros implements OnInit {

  @Output() volver = new EventEmitter<void>();

  ventas: Venta[] = [];
  ventaEditando: number | null = null;
  mensaje = '';

  formularioEdicion: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    compradores: new FormControl(1),
    cineco: new FormControl('no'),
    boletos: new FormControl(1)
  });

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas(): void {
    const datos = localStorage.getItem('ventasCinepolis');
    this.ventas = datos ? JSON.parse(datos) : [];
  }

  guardarEnLocalStorage(): void {
    localStorage.setItem('ventasCinepolis', JSON.stringify(this.ventas));
  }

  editar(venta: Venta): void {
    this.ventaEditando = venta.id;

    this.formularioEdicion.setValue({
      nombre: venta.nombre,
      compradores: venta.compradores,
      cineco: venta.cineco,
      boletos: venta.boletos
    });

    this.mensaje = '';
  }

  guardarEdicion(): void {
    if (this.ventaEditando === null) {
      return;
    }

    const nombre = String(this.formularioEdicion.get('nombre')?.value ?? '').trim();
    const compradores = Number(this.formularioEdicion.get('compradores')?.value);
    const cineco = String(this.formularioEdicion.get('cineco')?.value ?? 'no');
    const boletos = Number(this.formularioEdicion.get('boletos')?.value);

    if (nombre === '') {
      this.mensaje = 'Escribe el nombre del comprador.';
      return;
    }

    if (!Number.isInteger(compradores) || compradores < 1) {
      this.mensaje = 'La cantidad de compradores debe ser por lo menos 1.';
      return;
    }

    if (!Number.isInteger(boletos) || boletos < 1) {
      this.mensaje = 'La cantidad de boletos debe ser por lo menos 1.';
      return;
    }

    if (boletos > compradores * 7) {
      this.mensaje = 'No se pueden comprar más de 7 boletos por comprador.';
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

    let descuentoCineco = 0;

    if (cineco === 'si') {
      descuentoCineco = total * 0.10;
      total -= descuentoCineco;
    }

    const descuentoTotal = descuentoBoletos + descuentoCineco;

    const indice = this.ventas.findIndex(
      venta => venta.id === this.ventaEditando
    );

    if (indice !== -1) {
      this.ventas[indice] = {
        ...this.ventas[indice],
        nombre: nombre,
        compradores: compradores,
        cineco: cineco,
        boletos: boletos,
        importeOriginal: importeOriginal,
        descuento: descuentoTotal,
        total: total
      };

      this.guardarEnLocalStorage();
      this.ventaEditando = null;
      this.mensaje = 'El registro se actualizó correctamente.';
    }
  }

  eliminar(id: number): void {
  this.ventas = this.ventas.filter(venta => venta.id !== id);

  this.guardarEnLocalStorage();

  if (this.ventaEditando === id) {
    this.cancelarEdicion();
  }

  this.mensaje = 'El registro se eliminó correctamente.';
}

  cancelarEdicion(): void {
    this.ventaEditando = null;

    this.formularioEdicion.reset({
      nombre: '',
      compradores: 1,
      cineco: 'no',
      boletos: 1
    });

    this.mensaje = '';
  }

  regresar(): void {
    this.volver.emit();
  }
}