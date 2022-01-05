import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '../icon/icon.module';
import { EmptyContainerActionDirective } from './directives/empty-container-action.directive';
import { EmptyContainerComponent } from './empty-container.component';

@NgModule({
  declarations: [EmptyContainerComponent, EmptyContainerActionDirective],
  imports: [CommonModule, IconModule, MatButtonModule],
  exports: [EmptyContainerComponent, EmptyContainerActionDirective],
})
export class EmptyContainerModule {}
