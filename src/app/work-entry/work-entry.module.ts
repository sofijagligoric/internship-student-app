import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkEntryRoutingModule } from './work-entry-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyInternshipsComponent } from '../internships/my-internships/my-internships.component';
import { CreateWorklogComponent } from './create-worklog/create-worklog.component';
import { MyWorklogComponent } from './my-worklog/my-worklog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    MyWorklogComponent,
    CreateWorklogComponent
  ],
  imports: [
    CommonModule,
    WorkEntryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    ScrollingModule
  ]
})
export class WorkEntryModule { }
