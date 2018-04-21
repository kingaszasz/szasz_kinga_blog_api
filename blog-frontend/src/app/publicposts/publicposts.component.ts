import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publicposts',
  templateUrl: './publicposts.component.pug',
  styleUrls: ['./publicposts.component.css']
})
export class PublicpostsComponent implements OnInit {

  entries: Array<BlogEntry>;
  publicEntries: Array<BlogEntry>;

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

  constructor(public http: HttpClient) {
    this.getAll();
  }

  // feltölti a entries változót a szerverről kapott adatokkal
  getAll() {
    this.http.get(this.url).subscribe(
      (data: Array<BlogEntry>) => {
        this.entries = data;
        this.publicEntries = this.entries.filter(entry => !entry.onlyMeCanSee);
        console.log(this.publicEntries);

      }
    );
  }

  modalChange(id) {
    const choosen = this.entries.filter(entry => entry._id === id)[0];
    this.modal = Object.assign({}, choosen); // a this.modal megkapja egy duplikációját a choosennen
  }


  ngOnInit() {
  }
}
