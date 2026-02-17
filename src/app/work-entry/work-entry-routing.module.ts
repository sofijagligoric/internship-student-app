import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyWorklogComponent } from './my-worklog/my-worklog.component';
import { CreateWorklogComponent } from './create-worklog/create-worklog.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'my-worklog',
    pathMatch: 'full'
  },
  {
    path: 'my-worklog', 
    component: MyWorklogComponent
  },
  {
    path: 'create-worklog', 
    component: CreateWorklogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkEntryRoutingModule { }
