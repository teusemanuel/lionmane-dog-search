import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { AppErrorHandlerService } from '@app/core/error/app-error-handler.service';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(private appErrorHandlerService: AppErrorHandlerService) {}

  handleError(error: Error | TypeError | HttpErrorResponse | any): void {
    if (error) {
      if (!(error instanceof HttpErrorResponse) && error.rejection) {
        error = error.rejection;
      }

      if (error instanceof HttpErrorResponse) {
        const httpErrorCode = error.status;
        switch (httpErrorCode) {
          case StatusCodes.UNAUTHORIZED:
            this.appErrorHandlerService.unauthorized();
            break;
          case StatusCodes.FORBIDDEN:
            this.appErrorHandlerService.forbidden();
            break;
          case StatusCodes.BAD_REQUEST:
          case StatusCodes.NOT_FOUND:
          case StatusCodes.INTERNAL_SERVER_ERROR:
            this.appErrorHandlerService.serverError(error);
            break;
          default:
            this.appErrorHandlerService.open(this.appErrorHandlerService.getSnackBarDefaultMessage());
        }
        console.error('There was a HttpErrorResponse error.', error);
      }
    }
  }
}
