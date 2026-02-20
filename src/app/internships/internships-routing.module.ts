import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableInternshipsComponent } from './available-internships/available-internships.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { MyInternshipsComponent } from './my-internships/my-internships.component';
import { ViewInternshipComponent } from './view-internship/view-internship.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'available',
    pathMatch: 'full'
  },
  {
    path: 'available', 
    component: AvailableInternshipsComponent
  },
  {
    path: 'recommendations', 
    component: RecommendationsComponent
  },
    {
    path: 'my-internships', 
    component: MyInternshipsComponent
  },
  {
    path: 'view/:id', 
    component: ViewInternshipComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternshipsRoutingModule { }
