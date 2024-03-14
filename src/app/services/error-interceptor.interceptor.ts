
import { HttpInterceptorFn, HttpHandlerFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { inject } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { TranslateService } from '@ngx-translate/core';
import { NgxTranslateModule } from '../translation.module';

export const errorInterceptorInterceptor: HttpInterceptorFn = (
	req,
	next: HttpHandlerFn,
) => {

	let toastr = inject(ToastrService);
  //let translate = inject(NgxTranslateModule)

  let isExpired = true
  
  const token = sessionStorage.getItem("token");
      if (token) {
        let decodedToken :any  = jwtDecode(token);
        isExpired =
          decodedToken && decodedToken.exp
            ? decodedToken.exp < Date.now() / 1000
            : false;
      }
  
	return next(req).pipe(
		catchError((error) => {
			const token = sessionStorage.getItem("token");
      let isExpired = true
      if (token) {
        let decodedToken = jwtDecode(token);
        //console.log(decodedToken)
        isExpired =
          decodedToken && decodedToken.exp
            ? decodedToken.exp < Date.now() / 1000
            : false;
      }

			let fixedurl = error.url;
			fixedurl = fixedurl.replace("http://localhost:4200/api/", "");

      let errorToShowCode = error.error.errors[0]['extensions']['code']
      let errorToShowMsg = error.error.errors[0]['extensions']['reason']

      //translate.get('ERROR_MESSAGE').subscribe((errorMessage: string) => {
        // Use the translated error message
        //console.log(errorMessage);
      //});

			toastr.error(
        errorToShowMsg,
				errorToShowCode,
			);

      return throwError(() => error)
    
		}),
	);
};
