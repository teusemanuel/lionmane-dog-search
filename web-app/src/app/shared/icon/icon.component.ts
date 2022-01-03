import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';
import { Icon } from '@app/core/models/ui/icon';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() icon?: Icon;
  @Input()
  public get inline(): BooleanInput {
    return this.inlineValue;
  }
  public set inline(value: BooleanInput) {
    this.inlineValue = coerceBooleanProperty(value);
  }
  private inlineValue?: BooleanInput;

  @Input()
  public get ignoreCustomAttributes(): BooleanInput {
    return this.ignoreCustomAttributesValue;
  }
  public set ignoreCustomAttributes(value: BooleanInput) {
    this.ignoreCustomAttributesValue = coerceBooleanProperty(value);
  }
  private ignoreCustomAttributesValue: BooleanInput = false;

  constructor() {}
}
