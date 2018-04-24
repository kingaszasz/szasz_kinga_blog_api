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

  searchFor: string;
  searchValue = '';
  searchSuccess = true;


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
        this.entries = data;
        this.publicEntries = this.entries.filter(entry => (!entry.onlyMeCanSee || entry.onlyMeCanSee === false));
      }
    );
  }

  search() {
    this.searchValue = this.searchFor;
    this.http.get(this.url).subscribe(
      (data: Array<BlogEntry>) => {
        this.entries = data;
        // tslint:disable-next-line:max-line-length
        this.publicEntries = this.entries.filter(entry => (!entry.onlyMeCanSee || entry.onlyMeCanSee === false));
        this.publicEntries = this.publicEntries.filter(entry => ((entry.title).toLocaleLowerCase().indexOf(this.searchFor) !== -1
          || (entry.content).toLocaleLowerCase().indexOf(this.searchFor) !== -1));
        if (!this.publicEntries[0]) {
          this.searchSuccess = false;

        }
      });
      this.searchSuccess = true;
  }

  modalChange(id) {
    const choosen = this.entries.filter(entry => entry._id === id)[0];
    this.modal = Object.assign({}, choosen); // a this.modal megkapja egy duplikációját a choosennen
  }


  ngOnInit() {
  }
}
