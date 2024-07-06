import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


export const loggerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const token = sessionStorage.getItem('token');
  let httpclient = inject(HttpClient);
  let router = inject(Router);

  if (token) {
    let decodedToken = jwtDecode(token);
    //console.log(decodedToken)
    const isExpired = decodedToken && decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false;

    if (isExpired) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('email');
      router.navigateByUrl('/login');
    } else {
      console.log('Inject Token');
      req = req.clone({
        url: req.url,
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next(req);
  } else {
    return next(req);
  }
};
