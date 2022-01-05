import { Component, HostBinding, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { StringUtils } from '@app/core/utils/string-utils';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @HostBinding('style.height') get styleHeight(): string | undefined {
    return this.size && +this.size ? `${this.size}px` : (this.size as string);
  }
  @HostBinding('style.width') get styleWidth(): string | undefined {
    return this.styleHeight;
  }
  @HostBinding('style.fontSize') get styleFontSize(): string | undefined {
    return this.fontSize && +this.fontSize ? `${this.fontSize}px` : (this.fontSize as string);
  }
  @HostBinding('style.lineHeight') get styleLineHeight(): string | undefined {
    return this.styleFontSize;
  }
  @HostBinding('style.background-color') get styleBackground(): string {
    return !this.background || this.isPrimaryBackground || this.isPrimaryGradientBackground || this.isAccentBackground || this.isWarnBackground ? '' : this.background;
  }
  @HostBinding('class.primary') get isPrimaryBackground(): boolean {
    return this.background === 'primary' || false;
  }
  @HostBinding('class.primary-gradient') get isPrimaryGradientBackground(): boolean {
    return this.background === 'primary-gradient' || false;
  }
  @HostBinding('class.accent') get isAccentBackground(): boolean {
    return this.background === 'accent' || false;
  }
  @HostBinding('class.warn') get isWarnBackground(): boolean {
    return this.background === 'warn' || false;
  }
  @HostBinding('style.color') get styleColor(): string {
    return !this.color || this.isPrimaryColor || this.isAccentColor || this.isWarnColor ? '' : this.color;
  }
  @HostBinding('class.primary-color') get isPrimaryColor(): boolean {
    return this.color === 'primary' || false;
  }
  @HostBinding('class.accent-color') get isAccentColor(): boolean {
    return this.color === 'accent' || false;
  }
  @HostBinding('class.warn-color') get isWarnColor(): boolean {
    return this.color === 'warn' || false;
  }
  @HostBinding('class.circle') get isShapeCircle(): boolean {
    return this.shape === 'circle';
  }
  @HostBinding('class.square') get isShapeSquare(): boolean {
    return this.shape === 'square';
  }

  /**
   * Set the value from the avatar inicials or use a value attribute to set the full text from which the initials will be extracted
   */
  @Input()
  initials?: string;

  /**
   * Set the shape of the avatar
   * options:
   * - circle
   * - square
   *
   * default value is `circle`
   */
  @Input()
  shape: 'circle' | 'square' = 'circle';

  /**
   * Set a custom size(height, width) from the avatar converted to px or a custom value sent from string
   */
  @Input()
  size?: number | string;

  /**
   * Set a custom font-size and line-height from the avatar converted to px or a custom value sent from string
   */
  @Input()
  fontSize?: number | string;

  /**
   * Set a theme color:
   * - primary
   * - accent
   * - warn
   *
   * or a custom #HEX, RGB or RGBA
   *
   * default value is `primary`
   */
  @Input()
  color: ThemePalette | string | undefined;

  /**
   * Set a theme color:
   * - primary
   * - accent
   * - warn
   *
   * or a custom #HEX, RGB or RGBA
   *
   * default value is `primary`
   */
  @Input()
  background: ThemePalette | string = 'primary';

  /**
   * Set the full text from which the initials will be extracted
   */
  @Input()
  public get value(): string | undefined {
    return this.fullvalue;
  }
  public set value(value: string | undefined) {
    this.fullvalue = value;
    if (value) {
      this.initials = StringUtils.getInitials(value);
    }
  }
  private fullvalue?: string | undefined;

  constructor(private sanitizer: DomSanitizer) {}
}
