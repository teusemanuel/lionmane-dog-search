import { HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface ResponseMap {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}

export type QueryParams =
  | HttpParams
  | {
      [param: string]: string | number | boolean | string[];
    }
  | undefined;

const maxAge = 3600000; // cache of the 1 hour
@Injectable({
  providedIn: 'root',
})
export class ResponseCacheService {
  readonly refreshCache$ = new BehaviorSubject<void | null>(null);

  cache = new Map<string, ResponseMap>();

  constructor() {}

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < Date.now() - maxAge;
    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
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

  delete(request: ResponseMap | string, queryParams?: QueryParams): void {
    let params: HttpParams | undefined;
    if (request) {
      if (queryParams) {
        params = this.checkIsHttpParams(queryParams) ? queryParams : new HttpParams({ fromObject: queryParams });
        params.keys().forEach((key) => {
          if (!params?.get(key)) {
            params = params?.delete(key);
          }
        });
      }
      this.cache.delete(this.checkIsString(request) ? `${request}?${params ?? ''}` : request.url);
    }
  }

  clean(emitEvent = false): void {
    this.cache.forEach((expiredEntry) => {
      this.delete(expiredEntry);
    });
    if (emitEvent) {
      this.refreshCache$.next();
    }
  }

  createCacheObs<T>(obs: Observable<T>): Observable<T> {
    return this.refreshCache$.pipe(switchMap((): Observable<T> => obs));
  }

  private checkIsString(object?: any): object is string {
    return typeof object === 'string' || object instanceof String;
  }

  private checkIsHttpParams(object?: any): object is HttpParams {
    return 'map' in object;
  }
}
