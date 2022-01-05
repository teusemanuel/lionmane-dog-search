import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogBreedsComponent } from './dog-breeds.component';

const routes: Routes = [{ path: '', component: DogBreedsComponent, data: { title: 'Dog Breeds' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogBreedsRoutingModule {}
