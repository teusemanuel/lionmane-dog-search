import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DetailModule } from '@app/shared/detail/detail.module';
import { EmptyContainerModule } from '@app/shared/empty-container/empty-container.module';
import { SkeletonModule } from '@app/shared/skeleton/skeleton.module';
import { BsDogDetailComponent } from './components/bs-dog-detail/bs-dog-detail.component';
import { ConfirmActionDialogComponent } from './components/confirm-action-dialog/confirm-action-dialog.component';
import { MainBreedsComponent } from './components/main-breeds/main-breeds.component';
import { SubBreedsComponent } from './components/sub-breeds/sub-breeds.component';
import { DogBreedsRoutingModule } from './dog-breeds-routing.module';
import { DogBreedsComponent } from './dog-breeds.component';
import { FilterBreedsPipe } from './pipes/filter-breeds.pipe';

@NgModule({
  declarations: [DogBreedsComponent, FilterBreedsPipe, BsDogDetailComponent, ConfirmActionDialogComponent, MainBreedsComponent, SubBreedsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    DetailModule,
    SkeletonModule,
    EmptyContainerModule,
    FormsModule,
    MatBottomSheetModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatRippleModule,
    DogBreedsRoutingModule,
  ],
})
export class DogBreedsModule {}
