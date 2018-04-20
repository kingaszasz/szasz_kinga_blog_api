import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.pug',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {

  entries: any = '';

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

  constructor(public http: Http) {
    this.getAll();
  }

  // feltölti a entries változót a szerverről kapott adatokkal
  getAll() {
    this.http.get('http://localhost:3900/blog').subscribe(
      (data) => {
        this.errorHandling(data);
      }
    );
  }

  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.log('Api error: ' + res.error);
    } else {
      this.entries = res;
    }
  }

  create() {
    this.http.post('http://localhost:3900/blog', this.blogEntry)
    .subscribe(
      (data) => {
        this.errorHandling(data);
        console.log(this.blogEntry);
      }
    );
  }

  delete(id) {
    if (confirm('Really?')) {
    this.http.delete(`http://localhost:3900/blog/${id}`).
      subscribe((data) => this.entries = JSON.parse(data['_body']));
      this.getAll();

    }

  }

  modalChange(id) {
    const choosen = this.entries.filter(entry => entry._id === id)[0];
    this.modal = Object.assign({}, choosen); // a this.modal megkapja egy duplikációját a choosennen
  }
  update() {
    this.http.put('http://localhost:3900/blog/' + this.modal['_id'] , this.modal)
      .subscribe((data) => this.entries = JSON.parse(data['_body']));
      this.getAll();
  }

  ngOnInit() {
  }
}
