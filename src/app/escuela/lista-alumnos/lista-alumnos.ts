import { Component } from '@angular/core';
import { IAlumnos } from './alumnos';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-lista-alumnos',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './lista-alumnos.html',
  styleUrl: './lista-alumnos.css',
})
export class ListaAlumnos implements OnInit{
  formularios!:FormGroup

  alumnos: IAlumnos[]=[]
  nuevoAlumno:IAlumnos={
    matricula:'',
    nombre:'',
    correo:'',
    materia:''
  }

  ngOnInit():void{
    this.cargarAlumno()
    this.formulario=new FormGroup{
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl(''),
    }
  }

  cargarAlumno(){
    
  }
}