import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  indiceEdicion: number= -1

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
    })

  }

  agregarAlumnos(): void{
    if{
      this.nuevoAlumno.matricula === '' ||
      this.nuevoAlumno.nombre === '' ||
      this.nuevoAlumno.correo === '' ||
      this.nuevoAlumno.materia === '' 
    }{
      alert('Todos los campos son obligatorios');
      return;
    }
    if(this.indiceEdicion !== -1){
      this.alumnos[this.indiceEdicion]={
        ...this.nuevoAlumno
      }
    } else{
      this.alumnos.push({...this.nuevoAlumno})
    }

    localStorage.setItem(   
      'alumno',
      JSON.stringify(this.alumnos)
    )   
    this.limpiarCompos()
  }

  muestraAlumnos():void{
  this.nuevoAlumno.matricula=this.formularios.value.matricula
  this.nuevoAlumno.nombre=this.formularios.value.nombre
  this.nuevoAlumno.correo=this.formularios.value.correo
  this.nuevoAlumno.materia=this.formularios.value.materia
  this.agregarAlumnos()

  }
  cargarAlumnos(): void {
    const datos = localStorage.getItem('alumnos');
    if (datos){
      this.alumnos =JSON.parse(datos);
    
    }
  }
  editarAlumno (index:number):void{
    this.nuevoAlumno={
      ...this.alumno[index]
    }
    this.nuevoAlumno[index]{
      this.formulario.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      correo: alumno.correo,
      materia: alumno.materia,
      })
     
    this.indiceEdicion=index
  }
  eliminarAlumno(index: number): void{
    this.alumnos.splice(index,1)
    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    )
  }

  limpiarCompos():void{
    this.nuevoAlumno={
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    }
  }
  this.indiceEdicion=-1
}
}