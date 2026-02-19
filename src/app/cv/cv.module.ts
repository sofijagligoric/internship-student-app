import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { CvComponent } from './cv/cv.component';
import { NewCvComponent } from './new-cv/new-cv.component';
import {  ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CvComponent,
    NewCvComponent
  ],
  imports: [
    CommonModule,
    CvRoutingModule,
    ReactiveFormsModule
  ]
})
export class CvModule { }
