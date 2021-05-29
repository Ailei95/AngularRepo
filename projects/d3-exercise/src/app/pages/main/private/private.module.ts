import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    PrivateComponent
  ],
    imports: [
        CommonModule,
        PrivateRoutingModule,
        ReactiveFormsModule
    ]
})
export class PrivateModule { }
