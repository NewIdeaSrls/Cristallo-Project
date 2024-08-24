// src/app/global.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { Observable, ObservableInput, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  token = sessionStorage.getItem('token');
  prefixUrl = 'api/items/';

  constructor(
    private http: HttpClient,
    public toastr: ToastrService
  ) {}

  login(data: any): Observable<any> {
    return this.http.post<any[]>('api/auth/login', data).pipe(catchError(this.handleError));
  }

  addRecord(collection: string, data: any): Observable<any> {
    const url = this.prefixUrl + collection;
    console.log('Add URL:', url);
    console.log('Data to send:', data);
    return this.http.post<any[]>(url, data).pipe(catchError(this.handleError));
  }

  updateRecord(collection: string, id: number, data: any): Observable<any> {
    const url = this.prefixUrl + collection + `/${id}`;
    console.log('Update URL:', url);
    console.log('Data to send:', data);
    return  this.http.patch<any[]>(url, data).pipe(catchError(this.handleError));
  }

  deleteRecord(collection: string, id: number): Observable<any> {
    const url = this.prefixUrl + collection + `/${id}`;
    console.log('Delete URL:', url);
    console.log('Cancellazione', id);
    return this.http.delete<any[]>(url).pipe(catchError(this.handleError));
  }

  /*
  Filter Operators
  ##############################################################################################
  Equals							            _eq					Equal to
  Doesn't equal					          neq					Not equal to
  Less than						            _lt					Less than
  Less than or equal to			      _lte				Less than or equal to
  Greater than					          _gt					Greater than
  Greater than or equal to		    _gte				Greater than or equal to
  Is one of						            _in					Matches any of the values
  Is not one of					          _nin				Doesn't match any of the values
  Is null							            _null				Is null
  Isn't null						          _nnull				Is not null
  Contains						            _contains			Contains the substring
  Contains (case-insensitive)	  	_icontains			Contains the case-insensitive substring
  Doesn't contain					        _ncontains			Doesn't contain the substring
  Starts with						          _starts_with		Starts with
  Starts with						          _istarts_with		Starts with, case-insensitive
  Doesn't start with				      _nstarts_with		Doesn't start with
  Doesn't start with				      _nistarts_with		Doesn't start with, case-insensitive
  Ends with						            _ends_with			Ends with
  Ends with						            _iends_with			Ends with, case-insensitive
  Doesn't end with				        _nends_with			Doesn't end with
  Doesn't end with				        _niends_with		Doesn't end with, case-insensitive
  Is between						          _between			Is between two values (inclusive)
  Isn't between					          _nbetween			Is not between two values (inclusive)
  Is empty						            _empty				Is empty (null or falsy)
  Isn't empty						          _nempty				Is not empty (null or falsy)

  _regex [2]	Field has to match regex
  ##############################################################################################
  */
  getRecord(
    collection: string,
    id?: number,
    fields?: string[],
    filter?: object,
    order?: string[],
    limit?: number,
    page?: number,
    offset?: number,
    search?: string
  ): Observable<any> {
    let params = new HttpParams();
    let tofilter: any = filter;

    //console.log(this.prefixUrl + collection);

    if (fields) params = params.set('fields', fields.join(','));
    if (order) params = params.set('sort', order.join(','));
    if (limit) params = params.set('limit', limit.toString());
    if (page) params = params.set('page', page.toString());
    if (offset) params = params.set('offset', offset.toString());
    if (search) params = params.set('search', search.toString());

    if (id) {
      console.log(params);
      return this.http.get<any[]>(this.prefixUrl + collection + `/${id}`).pipe(catchError(this.handleError));
    } else {
      if (tofilter) {
        if (tofilter && Object.keys(tofilter).length) {
          for (const key in tofilter) {
            //console.log(key);
            for (const op in tofilter[key]) {
              params = params.append(`filter[${key}][${op}]`, tofilter[key][op]);
            }
          }
        }
      }

      //console.log(params);
      return this.http.get<any[]>(this.prefixUrl + collection, { params: params }).pipe(catchError(this.handleError));
    }
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log('Backend returned code :', error.status);
    console.log(error.error.errors[0].message);
    return of();
  }
}
