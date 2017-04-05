import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

import 'rxjs/Rx'

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Injectable()

export class PosterService {
    posterID: any;
    poster: FirebaseObjectObservable<any>;

    /**
     * 
    accessToken: String;
    public m2eurl ='https://api-m2x.att.com/v2/devices/';
    public key = 'c7a04867e5c3afe472c34bcd09507037';
    private selectedMovie: any;
    private posterid = 'weotest';
     */
    constructor(
        private storage: Storage,
        private http: Http,
        private af: AngularFire) {

        storage.ready().then(() => {
            storage.get('posterID').then((val) => {
                console.log('PosterID is', val);
                if (!val) {
                    val = this.getPosterID();
                    storage.set('posterID', val);
                }
                this.posterID = val;
                this.poster = af.database.object('/posters/' + this.posterID);
            })

        });
    }

    /**
     * Temporary solution is creating a uuid and saving in local storage in the browser.  In this temp solution a browser is a poster.
     * In the future the id will be based on CPU ID of on the device.
     */
    getPosterID() {
        if (this.posterID) return this.posterID;
        else return this.generateUUID();
    }
    /**
     * TODO add device specific details to what is stored in firebase.  (lat,long, anything)
     * @param fbData 
     */
    buildPoster(fbData) {
        this.poster = fbData;
    }
    generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    /**
     * 
     * @param id 
     * @param key 
        getData(id: string = this.poster.m2eid, key: string = this.poster.m2ekey) {
            if (id===undefined) id = this.poster.m2eid;
        if (key===undefined) key = this.poster.m2ekey;

        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8',
                                    "X-M2X-KEY": key });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.m2eurl+id+'/values', options)
            .catch(this.handleError);
    }

    getDetails(id: string = this.poster.m2eid, key: string = this.poster.m2ekey) {
        if (id===undefined) id = this.poster.m2eid;
        if (key===undefined) key = this.poster.m2ekey;

        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8',
                                    "X-M2X-KEY": key });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.m2eurl+id, options)
            .catch(this.handleError);
    }

    postData(data: any, id: string = this.poster.m2eid, key: string = this.poster.m2ekey) {

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

 */
}
