import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Handle the Errors
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private REST_API_SERVER = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unkown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      //Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  // to catch the error and retry request
  public sendGetRequest() {
    return this.httpClient
      .get(this.REST_API_SERVER)
      .pipe(retry(3), catchError(this.handleError)); // retry to send the failed HTTP request 3 times.
  }
}
