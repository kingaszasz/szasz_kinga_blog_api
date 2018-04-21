import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { NavComponent } from '../nav/nav.component';


@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.pug',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {
  @Input() user: User;
  /*user = {
    username: '',
    email: '',
    password: ''
  };*/

  entries: Array<BlogEntry>;
  myEntries: Array<BlogEntry>;
  success = false;

  blogEntry: BlogEntry = {
    tag: '',
    title: '',
    content: '',
    comment: [],
    onlyMeCanSee: true,
  };

  modal: BlogEntry = {
    _id: '',
    tag: '',
    title: '',
    content: '',
    comment: [],
    onlyMeCanSee: true,
    createdAt: new Date,
    updatedAt: new Date
  };

  url = 'http://localhost:3900/blog/';
  urlUser = 'http://localhost:3900/user/';

  constructor(public http: HttpClient) {

    console.log(this.user);
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user);
      this.success = true;
      this.getAll();
    this.getUser();

  }
}

  getUser() {
    this.http.get(this.urlUser)
      .subscribe(
        (data: any) => {
          //this.user = data;
          console.log(data);
        }
      );
  }

  getAll() {
    this.http.get(this.url).subscribe(
      (data: Array<BlogEntry>) => {
        console.log(data);
        this.entries = data;
        this.myEntries = this.entries.filter(entry => ((entry.userid) && entry.userid === this.user._id));
        console.log(this.myEntries);
      }
    );
  }

  create() {
    this.http.post(this.url, this.blogEntry)
      .subscribe(
        (data) => {
          this.getAll();
        }
      );
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

  modalChange(id) {
    const choosen = this.entries.filter(entry => entry._id === id)[0];
    this.modal = Object.assign({}, choosen); // a this.modal megkapja egy duplikációját a choosennen
  }
  update() {
    this.http.put(this.url + this.modal['_id'], this.modal)
      .subscribe(
        (data) => {
          this.getAll();
          console.log(this.modal['_id']);
        }
      );
  }

  ngOnInit() {
  }
}
