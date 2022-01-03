import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface RequestMap {
  url: string;
  response: Observable<HttpEvent<any>>;
  lastRead: number;
}

const maxAge = 3600000; // cache of the 1 hour
@Injectable({
  providedIn: 'root',
})
export class RequestCacheService {
  cache = new Map<string, RequestMap>();

  constructor() {}

  get(req: HttpRequest<any>): Observable<HttpEvent<any>> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < Date.now() - maxAge;
    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: Observable<HttpEvent<any>>): void {
    const url = req.urlWithParams;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    const expired = Date.now() - maxAge;
    this.cache.forEach((expiredEntry) => {
      if (expiredEntry.lastRead < expired) {
        this.delete(expiredEntry);
      }
    });
  }

  delete(request: RequestMap | string): void {
    if (request) {
      this.cache.delete(this.checkIsString(request) ? request : request.url);
    }
  }

  clean(): void {
    this.cache.forEach((expiredEntry) => {
      this.cache.delete(expiredEntry.url);
    });
  }

  private checkIsString(object?: any): object is string {
    return typeof object === 'string' || object instanceof String;
  }
}
