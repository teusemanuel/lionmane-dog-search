import { CommonModule, PlatformLocation } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressSpinnerComponent } from './componens/progress-spinner/progress-spinner.component';
import { AppErrorHandler } from './error/app-error-handler';
import { AppErrorHandlerService } from './error/app-error-handler.service';
import { httpInterceptorProviders } from './http';
import { APP_BASE_HREF } from './http/base-href';
import { SessionStorageService } from './storage/session-storage.service';
import { getBaseHref } from './utils/base-href-utils';

@NgModule({
  declarations: [ProgressSpinnerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HammerModule,
    MatProgressSpinnerModule, // material components
    MatSnackBarModule,
    MatDialogModule,
    FlexLayoutModule,
    MatNativeDateModule,
  ],
  providers: [
    SessionStorageService,
    httpInterceptorProviders,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } },
    { provide: APP_BASE_HREF, useFactory: getBaseHref, deps: [PlatformLocation] },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
      deps: [AppErrorHandlerService, SessionStorageService],
    },
  ],
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
