import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImagePlaceholderDirective } from './image-placeholder.directive';

@NgModule({
  declarations: [ImagePlaceholderDirective],
  imports: [CommonModule],
  exports: [ImagePlaceholderDirective],
})
export class AppDirectivesModule {}
