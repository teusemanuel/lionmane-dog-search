import { Directive, HostBinding, InjectionToken } from '@angular/core';

export const EMPTY_CONTAINER_ACTION = new InjectionToken<EmptyContainerActionDirective>('EmptyContainerAction');

@Directive({
  selector: 'app-empty-container-action, [app-empty-container-action], appEmptyContainerAction, [appEmptyContainerAction]',
  providers: [{ provide: EMPTY_CONTAINER_ACTION, useExisting: EmptyContainerActionDirective }],
})
export class EmptyContainerActionDirective {
  @HostBinding('class.empty-container-action')
  class = true;

  constructor() {}
}
