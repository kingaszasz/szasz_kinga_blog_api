import { Component } from '@angular/core';
import { Http, HttpModule } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;

  constructor(public http: Http) {

  }

  register() {
    this.http.post('http://localhost:8080' + '/register', this.user).subscribe(
      data => {
        console.log(data);
      });
  }

}

interface User {
  username: string;
  email: string;
  password: string;
}

