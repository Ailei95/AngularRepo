import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarchartRoutingModule } from './barchart-routing.module';
import { BarchartComponent } from './barchart.component';


@NgModule({
  declarations: [
    BarchartComponent
  ],
  imports: [
    CommonModule,
    BarchartRoutingModule
  ]
})
export class BarchartModule { }
