import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

@Injectable()

export class ApiaiService{
    http:any;
    accessToken: String;
    baseUrl: String;

    constructor(http: Http) {
        this.http = http;
        //this.accessToken = 'fa9e6c83d5c740c3b5d889b5157b59d8';
        this.accessToken = 'bd860d6287184228ab866fcb63b90b7f';
        this.baseUrl = "https://api.api.ai/v1/";
    }

    send(text: any) {
        let body = JSON.stringify({query: text, lang: "en", sessionId: "runmrtdata"});
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8',
                                    "Authorization": "Bearer " + this.accessToken });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + "query", body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error:any) {
        console.error(error);
        return Observable.throw(error.json().error || 'API.AI Server error');
    }

    

}
