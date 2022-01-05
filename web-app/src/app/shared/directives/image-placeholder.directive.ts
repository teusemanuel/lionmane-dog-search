import { BooleanInput } from '@angular/cdk/coercion';
import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'img[default], img[showSkeletonOnLoad]',
  exportAs: 'ImagePlaceholder',
})
export class ImagePlaceholderDirective {
  @Input()
  @HostBinding()
  src?: string;

  @Input()
  @HostBinding()
  class?: string;

  @Input() default?: string;

  @Input() set showSkeletonOnLoad(value: BooleanInput) {
    if (value) {
      this.class = `${this.class || ''} app-load-image-skeleton`;
    }
  }

  loaded?: boolean;

  @HostListener('load')
  onLoaded(): void {
    this.loaded = true;
    this.class = this.class?.replace('app-load-image-skeleton', '');
  }

  @HostListener('error')
  updateUrl(): void {
    this.class = this.class?.replace('app-load-image-skeleton', '');
    this.src = this.default;
    this.loaded = true;
  }
}
