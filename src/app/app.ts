import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Zodiaco} from './Formularios/zodiaco/zodiaco';
import {Usuario} from './Formularios/usuario/usuario';
import {Navbar} from './navbar/navbar';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [RouterOutlet, Zodiaco, Navbar, Usuario],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit{
  protected readonly title = signal('SegundoParcialAngular');

  ngOnInit(): void {
    initFlowbite();
  }
}
