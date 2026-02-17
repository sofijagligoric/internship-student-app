import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [

  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'app',
    loadChildren: () =>
      import('./layout/layout.module').then(m => m.LayoutModule),
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: ''
  }
];
