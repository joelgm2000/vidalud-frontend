import { ApplicationConfig } from '@angular/core';
import { provideRouter }     from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes }            from './app.routes';

// Firebase se inicializa directamente en firebase.config.ts
// No necesitamos @angular/fire para Angular 21
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]
};