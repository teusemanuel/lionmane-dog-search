import { Directive, HostBinding, InjectionToken } from '@angular/core';

export const DETAIL_DESCRIPTION = new InjectionToken<DetailDescriptionDirective>('DetailDescription');

@Directive({
  selector: 'app-detail-description, [app-detail-description], appDetailDescription, [appDetailDescription]',
  providers: [{ provide: DETAIL_DESCRIPTION, useExisting: DetailDescriptionDirective }],
})
export class DetailDescriptionDirective {
  @HostBinding('class.detail-description')
  class = true;

  private slimValue = false;

  constructor() {}
}
