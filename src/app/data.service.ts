import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

// Handle the Errors
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private REST_API_SERVER = 'http://localhost:3000/products';

  // Define the strings varialbles
  public first: string = '';
  public prev: string = '';
  public next: string = '';
  public last: string = '';

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
    // Add safe, Url encoded_page and limit parameter
    return this.httpClient
      .get(this.REST_API_SERVER, {
        params: new HttpParams({ fromString: '_page=1&_limit=20' }), //   params: new HttpParams({ fromString: '_page=1&_limit=20' }),
        observe: 'response',
      })
      .pipe(
        retry(3), // retry to send the failed HTTP request 3 times.
        catchError(this.handleError),
        tap((res) => {
          console.log(res.headers.get('Link'));
        })
      );
  }
  // ParseLinkHeader() method which parses the Link header and populate the previous variable accordingly
  parseLinkHeader(header: string) {
    if (header.length == 0) {
      return;
    }
    let parts = header.split(',');
    var links: any = {};
    parts.forEach((p: string) => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });

    this.first = links['first'];
    this.last = links['last'];
    this.prev = links['prev'];
    this.next = links['next'];
  }
}
