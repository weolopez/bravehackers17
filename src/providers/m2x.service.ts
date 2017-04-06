import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Injectable()

export class M2XService {
    poster: any;
    accessToken: String;
    public m2xurl ='https://api-m2x.att.com/v2/devices/';
    public key = 'c7a04867e5c3afe472c34bcd09507037';
    private selectedMovie: any;
    private posterid = 'weotest';
    constructor(private http: Http, private af: AngularFire) {
        af.database.object('/posters/'+this.posterid).subscribe(
            data=>this.poster=data
        )
    }

    getData(id: string = this.poster.m2xid, key: string = this.poster.m2xkey) {
        if (id===undefined) id = this.poster.m2xid;
        if (key===undefined) key = this.poster.m2xkey;

        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8',
                                    "X-M2X-KEY": key });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.m2xurl+id+'/values', options)
            .catch(this.handleError);
    }

    getDetails(id: string = this.poster.m2xid, key: string = this.poster.m2xkey) {
        if (id===undefined) id = this.poster.m2xid;
        if (key===undefined) key = this.poster.m2xkey;

        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8',
                                    "X-M2X-KEY": key });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.m2xurl+id, options)
            .catch(this.handleError);
    }

    postData(data: any, id: string = this.poster.m2xid, key: string = this.poster.m2xkey) {

        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8',
                                    "X-M2X-KEY": key });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.m2xurl+id+'/update', data, options)
            .catch(this.handleError);
    }

    handleError(error:any) {
        console.error(error);
        return Observable.throw(error.json().error || 'M2X Server error');
    }

}
