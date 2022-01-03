import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NotFoundComponent } from '@app/features/not-found/not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [MatCardModule, MatIconModule, MatButtonModule, FlexLayoutModule, NotFoundRoutingModule],
})
export class NotFoundModule {}
