import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { DetailAvatarDirective, DETAIL_AVATAR } from './directives/detail-avatar.directive';
import { DetailDescriptionDirective, DETAIL_DESCRIPTION } from './directives/detail-description.directive';
import { DetailTitleDirective, DETAIL_TITLE } from './directives/detail-title.directive';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailComponent {
  @ContentChild(DETAIL_AVATAR) avatar?: DetailAvatarDirective;
  @ContentChild(DETAIL_TITLE) title?: DetailTitleDirective;
  @ContentChild(DETAIL_DESCRIPTION) description?: DetailDescriptionDirective;

  @Input()
  get slim(): BooleanInput {
    return this.slimValue;
  }
  set slim(value: BooleanInput) {
    this.slimValue = coerceBooleanProperty(value);
  }

  @Input()
  public get isOverflowHidden(): BooleanInput {
    return this.isOverflowHiddenValue;
  }
  public set isOverflowHidden(value: BooleanInput) {
    this.isOverflowHiddenValue = coerceBooleanProperty(value);
  }

  private isOverflowHiddenValue: BooleanInput;
  private slimValue = false;

  constructor() {}
}
