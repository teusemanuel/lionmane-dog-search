import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '@app/core/services/ui/loader.service';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class LoaderInterceptor<T> implements HttpInterceptor {
	private requests: HttpRequest<T>[] = [];

	constructor(private loaderService: LoaderService) { }

	removeRequest(req: HttpRequest<T>): void {
		const i = this.requests.indexOf(req);
		if (i >= 0) {
			this.requests.splice(i, 1);
		}
		this.loaderService.isLoading.next(this.requests.length > 0);
	}

	intercept(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
		const isAsync = !req.headers.has('async-request') || req.headers.get('async-request') === 'true';

		if (isAsync === false) {
			this.requests.push(req);
			this.loaderService.isLoading.next(true);
		}
		return next.handle(req)
			.pipe(
				tap(event => {
					if (event instanceof HttpResponse) {
						this.removeRequest(req);
					}
				}),
				catchError(err => {
					this.removeRequest(req);
					return throwError(err);
				}),
				finalize(() => this.removeRequest(req))
			);
	}
}
