import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // add OnDestroy method to unscribe the Observables.

  products: any = [];

  destroy$: Subject<boolean> = new Subject<boolean>(); // Set destroy Subject

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .sendGetRequest()
      .pipe(takeUntil(this.destroy$)) // add takUntil method to unsubscribe
      .subscribe((data: any = []) => {
        console.log(data, 'catch error');
        this.products = data;
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject to prevent the data leaks, when the user about to leave the component.
    this.destroy$.unsubscribe();
  }
}
