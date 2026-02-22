import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternshipsRoutingModule } from './internships-routing.module';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { AvailableInternshipsComponent } from './available-internships/available-internships.component';
import { MyInternshipsComponent } from './my-internships/my-internships.component';
import { FormsModule } from '@angular/forms';
import { ViewInternshipComponent } from './view-internship/view-internship.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    RecommendationsComponent,
    AvailableInternshipsComponent,
    MyInternshipsComponent,
    ViewInternshipComponent
  ],
  imports: [
    CommonModule,
    InternshipsRoutingModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class InternshipsModule { }
