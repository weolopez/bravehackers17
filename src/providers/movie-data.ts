import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';

//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {AngularFire, FirebaseObjectObservable} from 'angularfire2';


@Injectable()
export class MovieData {  
  data: any;
  af: AngularFire;
  item: FirebaseObjectObservable<any>;
  constructor(public http: Http, public user: UserData, angularFire: AngularFire) {
    this.af=angularFire;
  }
  loadMovies() {
    return this.af.database.list('/movies');
  }
  loadRSS(feed) {  
    return this.http.get('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.fandango.com%2Frss%2F'+feed+'.rss');
  }
}