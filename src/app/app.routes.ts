
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'formulario',
    children: [
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./Formularios/usuario/usuario')
            .then((c) => c.Usuario)
      },
      {
        path: 'zodiaco',
        loadComponent: () =>
          import('./Formularios/zodiaco/zodiaco')
            .then((c) => c.Zodiaco)
      },
      {
        path: 'lista-alumnos',
        loadComponent: () =>
          import('./escuela/lista-alumnos/lista-alumnos')
            .then((c) => c.ListaAlumnos)
      },
      {
        path: 'cinepolis',
        loadComponent: () =>
          import('./escuela/cinepolis/cinepolis')
            .then((c) => c.Cinepolis)
      }
    ]
  },
  {
    path: 'utl',
    children: [
      // ---------- ALUMNOS ----------
      {
        path: 'alumnos',
        loadComponent: () =>
          import('./utl/alumnos/alumnos').then((c) => c.Alumnos),
      },
      {
        path: 'agregar',
        loadComponent: () =>
          import('./utl/alumnos/agregar/agregar').then((c) => c.Agregar),
      },
      {
        path: 'editar/:matricula',
        loadComponent: () =>
          import('./utl/alumnos/editar/editar').then((c) => c.Editar),
      },
      {
        path: 'eliminar/:matricula',
        loadComponent: () =>
          import('./utl/alumnos/eliminar/eliminar').then((c) => c.Eliminar),
      },

      {
        path: 'maestros',
        loadComponent: () =>
          import('./utl/maestros/maestros').then((c) => c.Maestros),
      },
      {
        path: 'maestros/agregar',
        loadComponent: () =>
          import('./utl/maestros/agregar/agregar').then((c) => c.AgregarMaestro),
      },
      {
        path: 'maestros/editar/:idmaestro',
        loadComponent: () =>
          import('./utl/maestros/editar/editar').then((c) => c.EditarMaestro),
      },
      {
        path: 'maestros/eliminar/:idmaestro',
        loadComponent: () =>
          import('./utl/maestros/eliminar/eliminar').then((c) => c.EliminarMaestro),
      },
    ],
  },

  {
    path: '',
    redirectTo: 'formulario/zodiaco',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'formulario/zodiaco'
  }
  
];
