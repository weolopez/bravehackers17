import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Injectable()

export class M2EService {
    poster: any;
    accessToken: String;
    public m2eurl ='https://api-m2x.att.com/v2/devices/';
    public key = 'c7a04867e5c3afe472c34bcd09507037';
    private selectedMovie: any;
    private posterid = 'weotest';
//ttps://api-m2x.att.com/v2/devices/9f02f28d67fac9f23933ba44e6093e31/update
    constructor(private http: Http, private af: AngularFire) {
        af.database.object('/posters/'+this.posterid).subscribe(
            data=>this.poster=data
        )
    }

    get() {
        return this.getDetails(this.poster.m2eid, this.poster.m2ekey);
    }
    getData(id, key) {
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8',
                                    "X-M2X-KEY": key });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.m2eurl+id+'/values', options)
            .catch(this.handleError);
    }

    getDetails(id, key) {
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8',
                                    "X-M2X-KEY": key });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.m2eurl+id, options)
            .catch(this.handleError);
    }

    postData(data) {
        return this.postM2E(this.poster.m2eid, this.poster.m2ekey, data);
    }
    postM2E(id, key, data) {
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8',
                                    "X-M2X-KEY": key });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.m2eurl+id+'/update', data, options)
            .catch(this.handleError);
    }

    handleError(error:any) {
        console.error(error);
        return Observable.throw(error.json().error || 'M2E Server error');
    }

}
