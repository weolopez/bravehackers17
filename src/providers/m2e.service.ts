import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Injectable()

export class M2EService{
    accessToken: String;
    public m2eurl ='https://api-m2x.att.com/v2/devices/';
    public key = 'c7a04867e5c3afe472c34bcd09507037';
    private selectedMovie: any;
    private posterid = 'blainetest';

    constructor(private http: Http, private af: AngularFire) {
    }

    getM2E(url, key) {
//      return this.af.database.object('/posters/'+this.posterid)

        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8',
                                    "X-M2X-KEY": key });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.m2eurl+url, options)
            .catch(this.handleError);
    }

    handleError(error:any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Movie Server error');
    }

    setSelectedMovie(movie: any) {
      this.selectedMovie = movie;
    }

    getSelectedMovie() {
      return this.selectedMovie || {};
    }

}
