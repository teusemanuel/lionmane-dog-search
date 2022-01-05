/**
 * Created by mateusaraujo on 23/10/18.
 */

'use strict';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CachingInterceptor } from '@app/core/http/caching-interceptor';
import { ConfigApiInterceptor } from '@app/core/http/config-api-interceptor';
import { LoaderInterceptor } from '@app/core/http/loader-interceptor';
import { SerializeInterceptor } from '@app/core/http/serialize-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ConfigApiInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },

  { provide: HTTP_INTERCEPTORS, useClass: SerializeInterceptor, multi: true },
];
