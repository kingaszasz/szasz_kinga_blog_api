import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.pug',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {
/*
  entries: any = '';
  blogEntry: BlogEntry = {
    _id: '',
    type: '',
    title: '',
    content: '',
    createdAt: new Date,
    updatedAt: new Date
  };
  modal: BlogEntry = {
    _id: '',
    type: '',
    title: '',
    content: '',
    createdAt: new Date,
    updatedAt: new Date
  };

  constructor(public http: Http) {
    this.getAll();
  }

  // feltölti a entries változót a szerverről kapott adatokkal
  getAll() {
    this.http.get('http://localhost:3900/blogpost').subscribe(
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

  // post, megkapja az adatot, ami az új adatokat tartalmazza
  create() {
    this.http.post('http://localhost:3900/blogpost/', this.blogEntry)
    .subscribe(
      (data) => {
        this.errorHandling(data);
      }
    );
  }

  delete(id) {
    this.http.delete(`http://localhost:3900/blogpost/${id}`).
      subscribe((data) => this.entries = JSON.parse(data['_body']));
  }
  
  modalChange(id) {
    let choosen = this.entries.filter(entry => entry._id === id)[0];
    this.modal = Object.assign({}, choosen); // a this.modal megkapja egy duplikációját a choosennen
  }
  update() {
    this.http.put('http://localhost:3900/blogpost/' + this.modal['_id'] , this.modal)
      .subscribe((data) => this.entries = JSON.parse(data['_body']));
  }*/
  ngOnInit() {
  }
}
