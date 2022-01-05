import { ActivatedRoute } from '@angular/router';

export class StringUtils {
  private static canvas: HTMLElement;

  static getStringLengthThatFit(
    text: string | undefined,
    maxWidth: number,
    fontSizePx: number = 16,
    fontWeight: 'normal' | 'bold' | number = 'normal',
    fontFamily: string = 'Roboto, "Helvetica Neue", sans-serif',
  ): number {
    const canvasContext = StringUtils.getCanvasContext(fontSizePx, fontWeight, fontFamily);
    if (canvasContext && text) {
      let strWidth = canvasContext.measureText(text).width;
      let strLen: number = text.length;

      while (strWidth >= maxWidth && strLen-- > 0) {
        const str = text.substring(0, strLen);
        strWidth = canvasContext.measureText(str).width;
      }
      return strLen;
    } else {
      return 0;
    }
  }

  static isValidURLPath(path: string): boolean {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(path);
  }

  static removeParamsFromURL(url: string): string {
    return url.split('?')[0];
  }

  static isString(obj: any): obj is string {
    return typeof obj === 'string';
  }

  static getParamsFromURL(url: string): Record<string, unknown> {
    const params = url.split('?')[1].split('&');
    const queryParams: Record<string, unknown> = {};

    for (const param of params) {
      const pair = param.split('=');
      queryParams[pair[0]] = pair[1];
    }

    return queryParams;
  }

  static capitalize(value: string): string {
    if (!value) {
      return '';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  static getInitials(name: string): string {
    if (!name) {
      return '';
    }
    const initialsMatch = name.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g) || [];
    const initials = `${initialsMatch.shift() || ''}${initialsMatch.pop() || ''}`.toUpperCase();
    return initials;
  }

  static splice(text: string, offset: number, value: string, removeCount = 0): string {
    const calculatedOffset = offset < 0 ? this.length + offset : offset;
    return text.substring(0, calculatedOffset) + value + text.substring(calculatedOffset + removeCount);
  }

  static onlyDigits(value: string): string | null {
    return !value ? null : value.replace(/\D/g, '');
  }

  static onlyDigitsNumber(value: string): number | null {
    const digits = StringUtils.onlyDigits(value);

    return digits ? +digits : null;
  }

  static camalize(value: string): string {
    return value.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  }

  static urlFromRoute(route: ActivatedRoute, untilParentUrl = false): string {
    const segments = route.pathFromRoot.map((r) => r.snapshot.url).filter((urls) => !!urls[0]);
    if (untilParentUrl) {
      segments.pop();
    }
    return segments.map((urls) => urls.map((url) => url.path).join('/')).join('/');
  }

  private static getCanvasContext(
    fontSizePx: number = 16,
    fontWeight: 'normal' | 'bold' | any = 'normal',
    fontFamily: string = 'Roboto, "Helvetica Neue", sans-serif',
  ): CanvasRenderingContext2D | null {
    if (!StringUtils.canvas) {
      StringUtils.canvas = document.createElement('canvas');
    }

    const context = (StringUtils.canvas as HTMLCanvasElement).getContext('2d');
    if (context) {
      if (context.font === `${fontWeight} ${fontSizePx}px ${fontFamily}`) {
        return context;
      }
      context.font = `${fontWeight} ${fontSizePx}px ${fontFamily}`;
      return context;
    } else {
      return null;
    }
  }
}
