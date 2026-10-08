import { Component, OnInit } from '@angular/core';
import { IAlumnos } from './alumnos';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-alumnos',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './lista-alumnos.html',
  styleUrl: './lista-alumnos.css',
})
export class ListaAlumnos implements OnInit {

  formularios!: FormGroup;

  alumnos: IAlumnos[] = [];
  nuevoAlumno: IAlumnos = {
    matricula: 'xx',
    nombre: 'xx',
    correo: 'xx',
    materia: 'xx'
  };

  ngOnInit(): void {

    this.cargarAlumno();

    this.formularios = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl('')
    });

  }
  muestraAlumnos():void{
  this.nuevoAlumno.matricula=this.formularios.value.matricula
  this.nuevoAlumno.nombre=this.formularios.value.nombre
  this.nuevoAlumno.correo=this.formularios.value.correo
  this.nuevoAlumno.materia=this.formularios.value.materia

  }

  cargarAlumno(): void {

  }

}