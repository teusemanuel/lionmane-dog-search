import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestCacheService } from '@app/core/services/core/request-cache.service';
import { ResponseCacheService } from '@app/core/services/core/response-cache.service';
import { Observable, of } from 'rxjs';
import { share, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CachingInterceptor implements HttpInterceptor {

	constructor(private responseCache: ResponseCacheService, private requestCache: RequestCacheService) {
	}

	intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
		const isUseCache = req.headers.has('use-cache');
		if (isUseCache) {

			const cachedResponse = this.responseCache.get(req);
			if (cachedResponse) {
				return of(cachedResponse);
			}
			let cachedRequest = this.requestCache.get(req);
			if (!cachedRequest) {
				cachedRequest = next.handle(req).pipe(
					tap((event: HttpEvent<T>) => {
						if (event instanceof HttpResponse) {
							this.responseCache.put(req, event);
							this.requestCache.delete(req.urlWithParams);
						}
					}),
					share()
				);
				this.requestCache.put(req, cachedRequest);
			}

			return cachedRequest;
		}

		return next.handle(req);
	}
}
