import { PlatformLocation } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { ObjectMapper } from 'jackson-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SerializeInterceptor implements HttpInterceptor {
  constructor(private platformLocation: PlatformLocation) {}

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const isJsonBody = req.headers.get('Content-Type') === 'application/json';
    if (req.body && isJsonBody) {
      const objectMapper = new ObjectMapper();
      req = req.clone<any>({ body: objectMapper.stringify(req.body) });
    }

    const api = environment.api;
    if (!req.url.includes(api)) {
      req = req.clone({ headers: req.headers.delete('Authorization').delete('base-href') });
    }

    return next.handle(req);
  }
}
