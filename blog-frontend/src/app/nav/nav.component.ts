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
  cookieUser: string;

  url = 'http://localhost:3900/user/';

  constructor(public http: HttpClient) {
    this.cookieUser = this.getCookie();
    if (this.success === false && this.cookieUser !== '' && this.cookieUser !== 'no user') {
      this.user.username = this.cookieUser;
    }
    console.log(this.cookieUser, 'type', typeof this.cookieUser);
  }

  getUser() {
    this.http.get(this.url)
      .subscribe(
        (data: any) => {
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
    this.setCookie('username', this.user.username, 1);
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
    this.cookieUser = '';
    document.cookie = 'username=this.user.username; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    window.location.reload();
  }

  setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + ' = ' + cvalue + ' ; ' + expires + ';path=/';
  }
  ngOnInit() {
  }

  getCookie(): string {
    const name = 'username' + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            const username = c.substring(name.length, c.length) ;
            return username;
        }
    }
    return  'no user';
}
}
