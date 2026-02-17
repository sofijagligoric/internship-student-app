import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: 'cv',
        loadChildren: () =>
          import('../cv/cv.module').then(m => m.CvModule)
      },

      {
        path: 'internships',
        loadChildren: () =>
          import('../internships/internships.module').then(m => m.InternshipsModule)
      },

      {
        path: 'work-entry',
        loadChildren: () =>
          import('../work-entry/work-entry.module').then(m => m.WorkEntryModule)
      },

      {
        path: '',
        redirectTo: 'cv',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
