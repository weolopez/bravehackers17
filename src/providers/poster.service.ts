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

}
