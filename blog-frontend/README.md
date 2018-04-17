# BlogFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## steps:
1. ng new blog-frontend, majd VSCodebanezt a mappát nyitom meg

2. ng eject

3. webpack.config.js-ben kiegészítem a rules-t:
  "module": {
    "rules": [
      {
        "test": /\.pug$/,
        "loader": ["raw-loader", "pug-html-loader"]
      },
      ...

4. npm i pug pug-html-loader -D

5. app.component.html -t átnevezzük .pug kiterjesztésre

6. tartalmát átkonvertáljuk pug-osra, lecseréljük

7. átírom az app.component.ts-ben:
    templateUrl: './app.component.pug'

8. majd npm start paranccsal indul

localhost 4200-on fut!

## további lépések:
npm i bootsrtap -D // a legfrissebbet huzza le
npm install jquery-D


css top
<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css" crossorigin="anonymous">



bootstrap js + jquery js alulra

<script src="\node_modules\jquery\dist\jquery.min.js"></script>
  
<script src="\node_modules\bootstrap\dist\js\bootstrap.min.js"></script>