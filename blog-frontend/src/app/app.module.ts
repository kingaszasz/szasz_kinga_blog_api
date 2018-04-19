import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';

import { Http, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './aboutus/aboutus.component';
import { DevelopComponent } from './develop/develop.component';
import { BackgrounComponent } from './backgroun/backgroun.component';
import { MypostsComponent } from './myposts/myposts.component';

const routes: Routes = [
  { path: '', component: MypostsComponent, pathMatch: 'full' },
  { component: LoginComponent, path: 'login' },
  { component: MypostsComponent, path: 'myposts' },
  { component: DevelopComponent, path: 'develop' },
  { component: BackgrounComponent, path: 'background' },
  { component: AboutUsComponent, path: 'about' },
];



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    AboutUsComponent,
    DevelopComponent,
    BackgrounComponent,
    MypostsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
