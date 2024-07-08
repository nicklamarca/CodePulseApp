import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(HttpClientModule), 
    importProvidersFrom(MarkdownModule.forRoot()),
    provideRouter(routes, withRouterConfig({})),
    // ... other providers if any
  ],
}).catch((err) => console.error(err));