import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';

import { Http, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutUsComponent } from './aboutus/aboutus.component';
import { DevelopComponent } from './develop/develop.component';
import { BackgrounComponent } from './backgroun/backgroun.component';
import { MypostsComponent } from './myposts/myposts.component';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { PublicpostsComponent } from './publicposts/publicposts.component';

const routes: Routes = [
  { path: '', component: BackgrounComponent, pathMatch: 'full' },
  { component: MypostsComponent, path: 'myposts' },
  { component: DevelopComponent, path: 'develop' },
  { component: BackgrounComponent, path: 'background' },
  { component: AboutUsComponent, path: 'about' },
  { component: WellcomeComponent, path: 'user/wellcome' },
  { component: PublicpostsComponent, path: 'public' },
];



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutUsComponent,
    DevelopComponent,
    BackgrounComponent,
    MypostsComponent,
    WellcomeComponent,
    PublicpostsComponent
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
