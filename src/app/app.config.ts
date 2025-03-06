import { ApplicationConfig, provideZoneChangeDetection,  } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
// import { loadingInterceptor } from '@interceptors/loading/loading.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      // withInterceptors([loadingInterceptor]),
    ),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    },
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()), 
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        includePostRequests: true
      })
    )
  ]
};
