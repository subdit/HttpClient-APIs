import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // add OnDestroy method to unscribe the Observables.

  products: any = [];

  destroy$: Subject<boolean> = new Subject<boolean>(); // Set destroy Subject to emit the boolean value

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService['sendGetRequest']()
      .pipe(takeUntil(this.destroy$)) // add takUntil method to unsubscribe
      .subscribe((res: HttpResponse<any>) => {
        console.log(res, 'catch error');
        this.products = res.body;
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject to prevent the data leaks, when the user about to leave the component before the HTTP response is received
    this.destroy$.unsubscribe();
  }
  public firstPage() {
    this.products = [];
    this.dataService
      .sendGetRequestToUrl(this.dataService.first)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
  }
  public previousPage() {
    if (this.dataService.prev !== undefined && this.dataService.prev !== '') {
      this.products = [];
      this.dataService
        .sendGetRequestToUrl(this.dataService.prev)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.products = res.body;
        });
    }
  }
  public nextPage() {
    if (this.dataService.next !== undefined && this.dataService.next !== '') {
      this.products = [];
      this.dataService
        .sendGetRequestToUrl(this.dataService.next)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.products = res.body;
        });
    }
  }
  public lastPage() {
    this.products = [];
    this.dataService
      .sendGetRequestToUrl(this.dataService.last)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
  }
}
