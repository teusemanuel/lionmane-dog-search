import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DetailComponent } from './detail.component';
import { DetailAvatarDirective } from './directives/detail-avatar.directive';
import { DetailDescriptionDirective } from './directives/detail-description.directive';
import { DetailTitleDirective } from './directives/detail-title.directive';

@NgModule({
  declarations: [DetailComponent, DetailTitleDirective, DetailDescriptionDirective, DetailAvatarDirective],
  imports: [CommonModule, FlexLayoutModule],
  exports: [DetailComponent, DetailTitleDirective, DetailDescriptionDirective, DetailAvatarDirective],
})
export class DetailModule {}
