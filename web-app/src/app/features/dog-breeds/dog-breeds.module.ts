import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DogBreedsRoutingModule } from './dog-breeds-routing.module';
import { DogBreedsComponent } from './dog-breeds.component';


@NgModule({
  declarations: [
    DogBreedsComponent
  ],
  imports: [
    CommonModule,
    DogBreedsRoutingModule
  ]
})
export class DogBreedsModule { }
