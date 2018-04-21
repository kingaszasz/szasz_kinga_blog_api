import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.pug',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {

  entries: Array<BlogEntry>;

  blogEntry: BlogEntry = {
    tag: '',
    title: '',
    content: '',
    comment: []
  };

  modal: BlogEntry = {
    _id: '',
    tag: '',
    title: '',
    content: '',
    comment: [],
    createdAt: new Date,
    updatedAt: new Date
  };
  url = 'http://localhost:3900/blog/';

  constructor(public http: HttpClient) {
    this.getAll();
  }

  // feltölti a entries változót a szerverről kapott adatokkal
  getAll() {
    this.http.get(this.url).subscribe(
      (data: Array<BlogEntry>) => {
        console.log(data);
        this.entries = data;
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
