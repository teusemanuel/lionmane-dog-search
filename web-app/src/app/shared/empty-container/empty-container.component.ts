import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '@app/core/models/ui/icon';
import { EmptyContainerActionDirective, EMPTY_CONTAINER_ACTION } from './directives/empty-container-action.directive';

@Component({
  selector: 'app-empty-container',
  templateUrl: './empty-container.component.html',
  styleUrls: ['./empty-container.component.scss'],
})
export class EmptyContainerComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('app-title') title? = '';
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('app-sub-title') subTitle? = '';
  @ContentChild(EMPTY_CONTAINER_ACTION) action?: EmptyContainerActionDirective;
  @Input() actionLabel?: string = undefined;
  @Output() actionClick: EventEmitter<void> = new EventEmitter();
  @Input() topIcon?: Icon;
  @Input() get actionIcon(): Icon | undefined {
    return this.actionIconValue;
  }
  set actionIcon(value: Icon | undefined) {
    if (value) {
      value.color = 'primary';
    }
    this.actionIconValue = value;
  }

  @Input()
  get slim(): BooleanInput {
    return this.slimValue;
  }
  set slim(value: BooleanInput) {
    this.slimValue = coerceBooleanProperty(value);
  }

  private slimValue = false;
  private actionIconValue?: Icon;

  constructor() {}

  actionClicked(): void {
    this.actionClick.emit();
  }
}
