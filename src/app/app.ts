import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './navbar/navbar';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [RouterOutlet, Navbar],
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
