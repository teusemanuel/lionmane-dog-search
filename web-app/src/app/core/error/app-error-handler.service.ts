import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { RequestCacheService } from '@app/core/services/core/request-cache.service';
import { ResponseCacheService } from '@app/core/services/core/response-cache.service';
import { SessionStorageService } from '@app/core/storage/session-storage.service';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppErrorHandlerService {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private zone: NgZone,
    private authStorageService: SessionStorageService,
    private requestCacheService: RequestCacheService,
    private responseCacheService: ResponseCacheService,
  ) {}

  open(textOfError: string, action: string = 'OK'): void {
    this.zone.run(() => {
      this.snackBar.open(textOfError, action, { panelClass: 'app-error' });
    });
  }

  navigateByUrl(url: string, extras?: NavigationExtras): void {
    this.zone.run(() => {
      this.router.navigateByUrl(this.router.createUrlTree([url], extras));
    });
  }

  unauthorized(message?: string): void {
    this.zone.run(() => {
      this.responseCacheService.clean();
      this.requestCacheService.clean();
      if (message) {
        this.open(message);
      }
      this.router.navigateByUrl(this.router.createUrlTree(['/not-found']));
    });
  }

  forbidden(): void {
    this.zone.run(() => {
      this.router.navigateByUrl(this.router.createUrlTree(['/not-found']));
    });
  }

  serverError(error: HttpErrorResponse): void {
    let paramsError: string[] = [];

    if (error.error instanceof Blob) {
      this.parseErrorBlob(error);
    } else if (error.error) {
      paramsError = Object.keys(error.error);
    }

    if (error.message && paramsError.length === 0 && !(error.error instanceof Blob)) {
      this.open(error.message);
    } else if (paramsError.length > 0) {
      if (error.error.message) {
        this.open(error.error.message);
      } else {
        for (const param of paramsError) {
          this.open(error.error[param]);
        }
      }
    }
  }

  parseErrorBlob(err: HttpErrorResponse): void {
    const reader: FileReader = new FileReader();

    reader.onloadend = (e) => {
      const errors = JSON.parse(reader.result as string);
      if (errors?.message) {
        this.open(errors.message);
      } else {
        for (const params in errors) {
          if (errors.hasOwnProperty(params) && errors[params]) {
            this.open(errors[params]);
          }
        }
      }
    };
    reader.readAsText(err.error);
  }

  getSnackBarDefaultMessage: () => string = () => (!environment.production ? 'An error occurred: Please check the console.' : 'Ocorreu um erro. Por favor tente novamente mais tarde.');
}
