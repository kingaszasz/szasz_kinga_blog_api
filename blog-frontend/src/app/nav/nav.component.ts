import { Component, OnInit } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.pug',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user = {
    username: '',
    email: '',
    password: ''
  };
  newuser = {
    username: '',
    email: '',
    password: ''
  };
  success = false;
  successReg = false;
  url = 'http://localhost:3900/user/';

  constructor(public http: HttpClient) {
    this.getUser();
  }

  getUser() {
    this.http.get(this.url)
      .subscribe(
        (data: User) => {
          this.user = data;
          console.log(data);
        }
      );
  }

  register() {
    this.http.post(`${this.url}register`, this.newuser)
      .subscribe(
        (data: User) => {
          this.user = this.newuser;
          console.log(data);
        }
      );
      this.successReg = true;

  }

  login() {
    this.http.post(`${this.url}login`, this.user)
      .subscribe(
        (data: User) => {
          console.log(data);
        }
      );
      this.success = true;
  }

  logout() {
    this.http.get(`${this.url}logout`)
      .subscribe(
      (data: User) => {
        this.user = data;
        console.log(data);
      }
      );
      this.success = false;
  }

  ngOnInit() {
  }

}
