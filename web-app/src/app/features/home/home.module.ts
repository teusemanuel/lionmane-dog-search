import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { AppDirectivesModule } from '@app/shared/directives/app-directives.module';
import { SkeletonModule } from '@app/shared/skeleton/skeleton.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, AppDirectivesModule, AvatarModule, FlexLayoutModule, SkeletonModule, HomeRoutingModule],
})
export class HomeModule {}
