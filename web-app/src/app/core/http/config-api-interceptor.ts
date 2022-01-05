import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@app/core/http/base-href';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigApiInterceptor implements HttpInterceptor {
  constructor(@Inject(APP_BASE_HREF) private baseHref: string) {}

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    let url = req.url;

    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('assets/')) {
      const api = environment.api;
      url = `${api}/${req.url}`;
    }

    if (!url.startsWith('assets/')) {
      if (!req.headers.has('Content-Type') && !(req.body instanceof FormData)) {
        req = req.clone({
          headers: req.headers.set('Content-Type', 'application/json'),
        });
      }

      req = req.clone({
        headers: req.headers.set('Accept', '*/*'),
        withCredentials: false,
      });
    }

    req = req.clone({ url, headers: req.headers.set('base-href', this.baseHref) });

    if (req.method === 'GET' && req.params) {
      let params = this.checkIsHttpParams(req.params) ? req.params : new HttpParams({ fromObject: req.params });
      params.keys().forEach((key) => {
        if (!params.get(key)) {
          params = params.delete(key);
        }
      });

      req = req.clone({ params });
    }

    return next.handle(req);
  }

  private checkIsHttpParams(object?: any): object is HttpParams {
    return 'map' in object;
  }
}
