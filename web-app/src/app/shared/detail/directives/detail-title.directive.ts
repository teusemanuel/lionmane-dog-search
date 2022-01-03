import { Directive, HostBinding, InjectionToken } from '@angular/core';

export const DETAIL_TITLE = new InjectionToken<DetailTitleDirective>('DetailTitle');

@Directive({
  selector: 'app-detail-title, [app-detail-title], appDetailTitle, [appDetailTitle]',
  providers: [{ provide: DETAIL_TITLE, useExisting: DetailTitleDirective }],
})
export class DetailTitleDirective {
  @HostBinding('class.detail-title')
  class = true;

  constructor() {}
}
