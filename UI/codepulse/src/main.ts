import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core'; // Import importProvidersFrom
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(HttpClientModule), // Add HttpClientModule to providers
    provideHttpClient(),
    provideRouter(routes, withRouterConfig({})),
    // ... other providers if any
  ],
}).catch((err) => console.error(err));
