import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableInternshipsComponent } from './available-internships/available-internships.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { MyInternshipsComponent } from './my-internships/my-internships.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternshipsRoutingModule { }
