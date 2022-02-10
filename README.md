# AngularHttpclientExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## This application demonstrate

: Import {Injectable} from '@angular/core';
: HttpClient to handle the Error in both Client-side and Server-side using {ThrowError} from 'rxjs';
: Using {retry, catchError} from 'rxjs/operators';

## Server set-up

Created Faker dummy data in database.json
created generate.js to scaffolding and generate the data in a Database.json file.
Run npm run generate to generate and push the Faker data into Database.json file
Run npm run server to run the server in locallhost://3000/products
