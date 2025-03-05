import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';

const serverConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withHttpTransferCacheOptions({ // By default, HttpClient caches all HEAD and GET requests which don't contain Authorization or Proxy-Authorization headers. You can override those settings by using withHttpTransferCacheOptions when providing hydration.
      includePostRequests: true,
    })),
    provideServerRendering(),
    provideServerRouting(serverRoutes)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
