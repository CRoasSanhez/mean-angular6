import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const pagesUrl = "/api/scrapp/facebook/top";
const countriesUrl = "/public/countries";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Server returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getPages(country): Observable<any> {
    country = '/'+country;
    return this.http.get(pagesUrl+country, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getCountries():Observable<any>{
    return this.http.get(countriesUrl,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  
}

