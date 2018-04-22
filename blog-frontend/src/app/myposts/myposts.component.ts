import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.pug',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {

  loggedInUser = {
    username: '',
    email: '',
    password: ''
  };
  cookieUser: string;

  entries: Array<BlogEntry>;
  myEntries: Array<BlogEntry>;

  showMyPublic = true;

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
    username: this.cookieUser,
    onlyMeCanSee: true,
    createdAt: new Date,
    updatedAt: new Date
  };

  url = 'http://localhost:3900/blog/';


  constructor(public http: HttpClient) {
    this.cookieUser = this.getCookie();
    console.log(this.cookieUser, 'type', typeof this.cookieUser);
    this.getAll();

  }


  getAll() {
    this.http.get(this.url).subscribe(
      (data: Array<BlogEntry>) => {
        this.entries = data;
        this.myEntries = this.entries.filter(entry => ((entry.username) && entry.username === this.getCookie()));
      }
    );
  }

  showPublic() {
    this.http.get(this.url).subscribe(
      (data: Array<BlogEntry>) => {
        this.entries = data;
        // tslint:disable-next-line:max-line-length
        this.myEntries = this.entries.filter(entry => ((entry.username) && entry.username === this.getCookie() && entry.onlyMeCanSee === false));
      }
    );
  }

  showPrivate() {
    this.http.get(this.url).subscribe(
      (data: Array<BlogEntry>) => {
        this.entries = data;
        // tslint:disable-next-line:max-line-length
        this.myEntries = this.entries.filter(entry => ((entry.username) && entry.username === this.getCookie() && entry.onlyMeCanSee === true));
      }
    );  }

  create() {
    this.cookieUser = this.getCookie();
    if (this.cookieUser !== '' && this.cookieUser !== 'no user') {
      this.blogEntry.username = this.cookieUser;
      this.http.post(this.url, this.blogEntry).subscribe(
        data => {
          console.log(data);
          this.blogEntry = {
            tag: '',
            title: '',
            content: '',
            comment: [],
            onlyMeCanSee: true,
          };
          this.getAll();
        });
    } else {
      console.log('Nincs bejelentkezve');
    }
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

  getCookie(): string {
    const name = 'username' + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        const username = c.substring(name.length, c.length);
        return username;
      }
    }
    return 'no user';
  }
  ngOnInit() {
  }
}
