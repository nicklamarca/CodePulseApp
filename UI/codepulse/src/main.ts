import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { provideRouter, withRouterConfig } from '@angular/router'; // Import provideRouter and withRouterConfig
import { routes } from './app/app.routes'; // Import your routes

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(), // Add provideHttpClient to providers
    provideRouter(routes, withRouterConfig({})), // Add provideRouter with your routes
    // ... other providers if any
  ],
}).catch((err) => console.error(err));
