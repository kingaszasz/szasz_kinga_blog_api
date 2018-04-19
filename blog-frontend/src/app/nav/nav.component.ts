import { Component, OnInit } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

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

  constructor(public http: Http) {
  }

  getUser() {
    this.http.get('http://localhost:3900/user').subscribe(
      data => {
        this.errorHandling(data);
        console.log(data);
      });
  }
  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.log('Api error: ' + res.error);
    } else {
      console.log(res);
    }
  }

  register() {
    this.http.post('http://localhost:3900/user/register', this.newuser).subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  login() {
    this.http.post('http://localhost:3900/user/login', this.user).subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  logout() {
    this.http.get('http://localhost:3900/user/logout').subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  ngOnInit() {
  }

}
