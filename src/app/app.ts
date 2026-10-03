import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Zodiaco} from './Formularios/zodiaco/zodiaco';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [RouterOutlet, Zodiaco],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('SegundoParcialAngular');

  ngOnInit(): void {
    initFlowbite();
  }
}
