import {
	HttpInterceptorFn,
	HttpRequest,
	HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { inject } from "@angular/core";

export const successInterceptor: HttpInterceptorFn = (req, next) => {
	const methods = ["PUT", "POST", "DELETE"];
  let toastr = inject(ToastrService);
	//console.log(req);
	if (methods.includes(req.method)) {
		return next(req).pipe(
			tap((success) => {
				if (req.url.includes("/login")) {

				
				} else {

          switch(req.method) { 
            case "POST": { 
              toastr.success(
                "Inserimento",
                "Inserimento effettuato con successo",
              );
               break; 
            } 
            case "PUT": { 
              toastr.success(
                "Aggiornamento",
                "Aggiornamento effettuato con successo",
              );
               break; 
            } 
            case "DELETE": { 
              toastr.success(
                "Eliminazione",
                "Eliminazione effettuata con successo",
              );
               break; 
            } 
            default: { 
              toastr.error(
                "METODO",
                "Metodo non ammesso",
              );
               break; 
            } 
         } 

				}
			}),
		);
	}

	return next(req);
};
