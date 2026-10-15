
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { IAlumno } from './alumnos';

@Component({
  selector: 'app-lista-alumnos',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './lista-alumnos.html',
  styleUrl: './lista-alumnos.css'
})
export class ListaAlumnos implements OnInit {

  formularios!: FormGroup;
  alumnos: IAlumno[] = [];
  indiceEdicion: number = -1;

  nuevoAlumno: IAlumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: ''
  };

  ngOnInit(): void {

    this.formularios = new FormGroup({
      matricula: new FormControl('', Validators.required),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      correo: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      materia: new FormControl('', Validators.required)
    });

    this.cargarAlumno();
  }

  muestraAlumnos(): void {

    if (this.formularios.invalid) {
      this.formularios.markAllAsTouched();
      return;
    }

    this.nuevoAlumno = this.formularios.value as IAlumno;

    this.agregarAlumno();
  }

  agregarAlumno(): void {

    if (this.indiceEdicion !== -1) {

      this.alumnos[this.indiceEdicion] = {
        ...this.nuevoAlumno
      };

    } else {

      this.alumnos.push({
        ...this.nuevoAlumno
      });

    }

    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    );

    this.limpiarCampos();
  }

  cargarAlumno(): void {

    const datos = localStorage.getItem('alumnos');

    if (datos) {
      this.alumnos = JSON.parse(datos);
    }
  }

  editarAlumnos(index: number): void {

    this.nuevoAlumno = {
      ...this.alumnos[index]
    };

    this.formularios.patchValue({
      matricula: this.nuevoAlumno.matricula,
      nombre: this.nuevoAlumno.nombre,
      correo: this.nuevoAlumno.correo,
      materia: this.nuevoAlumno.materia
    });

    this.indiceEdicion = index;
  }

  eliminarAlumnos(index: number): void {

    this.alumnos.splice(index, 1);

    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    );

    if (this.indiceEdicion === index) {
      this.limpiarCampos();
    } else if (this.indiceEdicion > index) {
      this.indiceEdicion--;
    }
  }

  limpiarCampos(): void {

    this.nuevoAlumno = {
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    };

    this.formularios.reset({
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    });

    this.indiceEdicion = -1;
  }
}
