import { Component, OnInit } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.pug',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  static user: any;
  loggedInUser = {
    username: '',
    email: '',
    password: ''
  };
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

  url = 'http://localhost:3900/user/';

  constructor(public http: HttpClient) {

  }

  getUser() {
    this.http.get(this.url)
      .subscribe(
        (data: any) => {
          this.loggedInUser = data;
          console.log(JSON.parse(data));
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
    this.user = this.newuser;
    this.success = true;
  }

  login() {
    this.http.post(`${this.url}login`, this.user)
      .subscribe(
        (data: User) => {
          console.log(data);
        }
      );
    this.success = true;
    this.setCookie('username', this.user.username, 1);
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

  setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + ' = ' + cvalue + ' ; ' + expires + ';path=/';
  }
  ngOnInit() {
  }

  getCookie() {
    const name = 'username' + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return console.log(c.substring(name.length, c.length)); ;
        }
    }
    return  console.log('no cookie');
}
}
