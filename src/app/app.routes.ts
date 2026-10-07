import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'formulario',
    children: [

      {
        path: 'usuarios',
        loadComponent: () =>
          import('./Formularios/usuario/usuario').then(
            (c) => c.Usuario
          )
      },

      {
        path: 'zodiaco',
        loadComponent: () =>
          import('./Formularios/zodiaco/zodiaco').then(
            (c) => c.Zodiaco
          )
      },
      {
        path: 'lista-alumnos',
        loadComponent: () =>
          import('./escuela/lista-alumnos/lista-alumnos').then(
            (c) => c.ListaAlumnos
          )
      }

    ]
  },

  {
    path: '', redirectTo: 'formulario/zodiaco', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'formulario/zodiaco'
  }

];