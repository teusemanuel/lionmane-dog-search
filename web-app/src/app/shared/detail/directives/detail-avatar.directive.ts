import { Directive, HostBinding, InjectionToken } from '@angular/core';

export const DETAIL_AVATAR = new InjectionToken<DetailAvatarDirective>('DetailAvatar');

@Directive({
  selector: 'app-detail-avatar, [app-detail-avatar], appDetailAvatar, [appDetailAvatar]',
  providers: [{ provide: DETAIL_AVATAR, useExisting: DetailAvatarDirective }],
})
export class DetailAvatarDirective {
  @HostBinding('class.detail-avatar')
  class = true;

  constructor() {}
}
