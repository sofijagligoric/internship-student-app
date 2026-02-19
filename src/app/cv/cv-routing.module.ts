import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvComponent } from './cv/cv.component';
import { NewCvComponent } from './new-cv/new-cv.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cv',
    pathMatch: 'full'
  },
  {
    path: 'cv',
    component: CvComponent
  },
  {
    path: 'new',
    component:NewCvComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }
