import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.pug',
  styleUrls: ['./aboutus.component.css']
})
export class AboutUsComponent implements OnInit {
  users: Array<User>;

  user: User = {
    _id: '',
    username: '',
    email: '',
    password: ''
  };

  modal: User = {
    _id: '',
    username: '',
    email: '',
    password: ''
  };

  url = 'http://localhost:3900/user/';

  constructor(public http: HttpClient) {
    this.getAll();
  }

  // feltölti a entries változót a szerverről kapott adatokkal
  getAll() {
    this.http.get(this.url + '/list').subscribe(
      (data: any) => {
        this.users = data;
        console.log(this.users);
      }
    );
  }

  modalChange(id) {
    const choosen = this.users.filter(user => user._id === id)[0];
    this.modal = Object.assign({}, choosen); 
  }

  delete(id) {
    if (confirm('Really?')) {
      this.http.delete(this.url + id)
        .subscribe(
          (data) => {
            this.getAll();
          }
        );
    }
  }

  ngOnInit() {
  }
}
