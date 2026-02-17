import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'cv',
    loadChildren: () =>
      import('./cv/cv.module').then(m => m.CvModule),
    canActivate: [authGuard] 
  },

  {
    path: '**',
    redirectTo: ''
  }
];
