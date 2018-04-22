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

  entries: Array<BlogEntry>;
  myEntries: Array<BlogEntry>;
  success = false;

  blogEntry: BlogEntry = {
    tag: '',
    title: '',
    content: '',
    comment: [],
    onlyMeCanSee: true,
    username: NavComponent.user.username,
  };

  modal: BlogEntry = {
    _id: '',
    tag: '',
    title: '',
    content: '',
    comment: [],
    onlyMeCanSee: true,
    username: NavComponent.user.username,
    createdAt: new Date,
    updatedAt: new Date
  };

  url = 'http://localhost:3900/blog/';
  urlUser = 'http://localhost:3900/user/';

  constructor(public http: HttpClient) {
    this.getAll();
  }


  getAll() {
    this.http.get(this.url).subscribe(
      (data: Array<BlogEntry>) => {
        console.log(data);
        this.entries = data;
        this.myEntries = this.entries.filter(entry => ((entry.username) && entry.username === NavComponent.user.username));
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
