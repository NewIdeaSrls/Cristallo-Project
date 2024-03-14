
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { loggerInterceptor } from './services/logger.interceptor';
import { errorInterceptorInterceptor } from "./services/error-interceptor.interceptor";
import { successInterceptor } from "./services/success-interceptor.interceptor";
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
	providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
        timeOut: 1000,
        positionClass: 'toast-bottom-center',
        preventDuplicates: true,
        progressBar: true
    }),
    provideHttpClient(withInterceptors([loggerInterceptor, errorInterceptorInterceptor, successInterceptor])),
    provideAnimations()
],
};
