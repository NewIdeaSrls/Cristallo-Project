import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { loggerInterceptor } from './app/services/logger.interceptor';
import '@angular/compiler';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

