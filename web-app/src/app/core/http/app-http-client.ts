import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Deserialize } from 'cerialize';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Outcome } from '../models/core/outcome';

interface HttpClientRequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body';
  params?: HttpParams | { [param: string]: string | string[] };
  responseType?: 'json';
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface IRequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body';
  params?: HttpParams | { [param: string]: string | number | boolean | string[] };
  responseType?: 'json';
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface IRequestObjectOptions<T> extends IRequestOptions {
  responseObjectType: new () => T;
}

export interface IRequestObjectOptionsWithBody<T> extends IRequestObjectOptions<T> {
  body?: any;
}

@Injectable({
  providedIn: 'root',
})
export class AppHttpClient {
  // Extending the HttpClient through the Angular DI.
  public constructor(public http: HttpClient, private snackBar: MatSnackBar) {
    // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
    // for ex. this.httpClient.http.get(...)
  }

  /**
   * Construct a request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`
   */
  request<T, R>(method: string, url: string, options: IRequestObjectOptionsWithBody<R>): Observable<T | undefined>;

  /**
   * Overload request method
   */
  request<T, R>(method: string, url: string, options?: IRequestObjectOptionsWithBody<R>): Observable<T | undefined> {
    const reqOptions = this.parceAppendPageParams(options);
    return this.http.request<T>(method, url, reqOptions).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          if (options && this.checkIsRequestObjectOptions(options)) {
            return Deserialize(event.body, options.responseObjectType);
          }
        }
        return undefined;
      }),
      map((outcome: any) => (this.checkIsRequestObjectOptions(options) && outcome ? outcome.result : outcome)),
    );
  }

  /**
   * Construct a DELETE request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  delete<T, R>(url: string, options?: IRequestObjectOptions<R>): Observable<T>;

  /**
   * Overload delete method
   */
  delete<T, R>(url: string, options?: IRequestObjectOptions<R>): Observable<T | undefined> {
    const reqOptions = this.parceAppendPageParams(options);
    return this.deserialize(this.http.delete<T>(url, reqOptions), options);
  }

  /**
   * Construct a GET request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  get<T, R>(url: string, options?: IRequestObjectOptions<R>): Observable<T>;

  /**
   * Overload get method
   */
  get<T, R>(url: string, options?: IRequestObjectOptions<R>): Observable<T | undefined> {
    const reqOptions = this.parceAppendPageParams(options);
    return this.deserialize(this.http.get<T>(url, reqOptions), options);
  }

  /**
   * Construct a HEAD request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  head<T, R>(url: string, options?: IRequestObjectOptions<R>): Observable<T>;

  /**
   * Overload head method
   */
  head<T, R>(url: string, options?: IRequestObjectOptions<R>): Observable<T | undefined> {
    const reqOptions = this.parceAppendPageParams(options);
    return this.deserialize(this.http.head<T>(url, reqOptions), options);
  }

  /**
   * Construct an OPTIONS request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  options<T, R>(url: string, options?: IRequestObjectOptions<R>): Observable<T>;

  /**
   * Overload options method
   */
  options<T, R>(url: string, options?: IRequestObjectOptions<R>): Observable<T | undefined> {
    const reqOptions = this.parceAppendPageParams(options);
    return this.deserialize(this.http.options<T>(url, reqOptions), options);
  }

  /**
   * Construct a PATCH request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  patch<T, R>(url: string, body: any | undefined, options?: IRequestObjectOptions<R>): Observable<T>;

  /**
   * Overload patch method
   */
  patch<T, R>(url: string, body: any | undefined, options?: IRequestObjectOptions<R>): Observable<T | undefined> {
    const reqOptions = this.parceAppendPageParams(options);
    return this.deserialize(this.http.patch<T>(url, body, reqOptions), options);
  }

  /**
   * Construct a POST request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  post<T, R>(url: string, body: any | undefined, options?: IRequestObjectOptions<R>): Observable<T>;

  /**
   * Overload post method
   */
  post<T, R>(url: string, body: any | undefined, options?: IRequestObjectOptions<R>): Observable<T | undefined> {
    const reqOptions = this.parceAppendPageParams(options);
    return this.deserialize(this.http.post<T>(url, body, reqOptions), options);
  }

  /**
   * Construct a PUT request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  put<T, R>(url: string, body: any | undefined, options?: IRequestObjectOptions<R>): Observable<T>;

  /**
   * Overload put method
   */
  put<T, R>(url: string, body: any | undefined, options?: IRequestObjectOptions<R>): Observable<T | undefined> {
    const reqOptions = this.parceAppendPageParams(options);
    return this.deserialize(this.http.put<T>(url, body, reqOptions), options);
  }

  /**
   * Get PageInfo if exists in options and set in params.
   *
   * @return an `IRequestObjectOptions<R>` options.
   */
  private parceAppendPageParams<R>(options?: IRequestObjectOptions<R>): HttpClientRequestOptions {
    let httpParams = new HttpParams();
    const params = options?.params;
    delete options?.params;

    if (params) {
      if (this.checkIsHttpParams(params)) {
        httpParams = params;
      } else {
        const fromObject: { [param: string]: string | readonly string[] } = {};
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key) && params[key] != null && params[key] !== undefined) {
            const element = params[key];
            fromObject[key] = Array.isArray(element) ? element : `${element}`;
          }
        }

        httpParams = new HttpParams({ fromObject });
      }
    }
    return {
      ...options,
      ...{ params: httpParams },
    };
  }

  private checkIsHttpParams(object?: any): object is HttpParams {
    return 'map' in object;
  }

  /**
   * Deserialize body and handle Outcome error and message.
   *
   * @return an `Observable` of the body as type `Outcome<T>` or `T` or null if not exists `options`.
   */
  private deserialize<T, R>(observer: Observable<T>, options?: IRequestObjectOptions<R>): Observable<T> {
    return observer.pipe(
      map((body) => {
        if (options && this.checkIsRequestObjectOptions(options)) {
          return Outcome.Deserialize(body, options.responseObjectType);
        }
        return undefined;
      }),
      tap((outcome) => {
        if (outcome && outcome.hasError() && outcome.result) {
          const message: any = outcome.result;
          this.snackBar.open(message as string, `OK`);
        }
      }),
      map((outcome: any) => outcome.result as T),
    );
  }

  private checkIsRequestObjectOptions<R>(object?: any): object is IRequestObjectOptions<R> {
    return 'responseObjectType' in object;
  }
}
