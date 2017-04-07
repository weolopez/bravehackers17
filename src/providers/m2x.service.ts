import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class M2XService {
    poster: any;
    accessToken: String;
    public url = 'https://api-m2x.att.com/v2/devices';
    public key = 'd799d942e16376f6f1abb66fad955338';
    public id = 'fc71ef32c6aa233cd42bffc21f88cf93';
    private selectedMovie: any;
    private posterid: string;
    private started=false;
    private m2edata: any;
    constructor(private http: Http, private af: AngularFire) {
        this.posterid = this.getPosterId();
        af.database.object('/posters/' + this.posterid).subscribe(
            data => this.poster = data
        )
    }

    getPosterId() {
        this.posterid = localStorage.getItem('posterid');
        if (!this.posterid) {
            if (this.started) return;
            this.started=true; 
            this.newM2XDevice().subscribe(
                data=>this.newFirebaseDevice(data.json())
            )
        }
        return this.posterid;
    }
    newFirebaseDevice(data) {
        
            let defaultPoster = {};
            this.posterid = this.generateUUID();

            defaultPoster = this.getDefaultData();
            defaultPoster['posterid'] = this.posterid;
            defaultPoster['m2eid'] = data.id;
            defaultPoster['m2ekey'] = this.key;

        console.dir(defaultPoster);
            this.af.database.object('/posters/' + this.posterid).set(defaultPoster).then(e=>console.dir(e));
            localStorage.setItem('posterid', this.posterid);
    }
    newM2XDevice(key: string = this.key): Observable<any>  {
        if (key === undefined) key = this.key;

        let data = {
            name: this.posterid,
            description: 'Digital Interactice Poster',
            visibility: 'public',
            tags: 'BraveHackers',
            base_device: 'fc71ef32c6aa233cd42bffc21f88cf93',
            serial: this.generateUUID()
        }

        let headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            "X-M2X-KEY": key
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url, data, options)
            .catch(this.handleError)
    }
    list( key: string = this.key): Observable<Response> {
        let headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            "X-M2X-KEY": key
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + '/catalog' , options)
            .catch(this.handleError);
    }
    deleteDevice(id, key: string = this.key) {
        let headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            "X-M2X-KEY": key
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.url + '/' + id , options)
            .catch(this.handleError);
    }
    getData(id: string = this.id, key: string = this.key) {
        if (id === undefined) id = this.id;
        if (key === undefined) key = this.key;

        let headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            "X-M2X-KEY": key
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + '/' + id + '/values', options)
            .catch(this.handleError);
    }
    getDetails(id: string = this.id, key: string = this.key) {
        let headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            "X-M2X-KEY": key
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + '/' + id, options)
            .catch(this.handleError);
    }

    postData(data: any, id: string = this.id, key: string = this.key) {

        let headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            "X-M2X-KEY": key
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + '/' + id + '/update', data, options)
            .catch(this.handleError);
    }

    handleError(error: any) {
        console.error(error);
        localStorage.setItem('posterid','blainetest');
        return Observable.defer(error.json().error || 'M2E Server error');
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
    getDefaultData() {
        return {
            "m2eid": "fc71ef32c6aa233cd42bffc21f88cf93",
            "m2ekey": "d799d942e16376f6f1abb66fad955338",
            "movie": {
                "cast": [{
                    "avatarUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDkzMjEzNDMyN15BMl5BanBnXkFtZTcwNTk3ODEyOQ@@._V1_UY317_CR13,0,214,317_AL_.jpg",
                    "character": "Batman / Bruce Wayne",
                    "name": "Will Arnett"
                }, {
                    "avatarUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BNTgyNDgxMjUyOV5BMl5BanBnXkFtZTcwMDYxNzY1OQ@@._V1_UX214_CR0,0,214,317_AL_.jpg",
                    "character": "Robin / Dick Grayson",
                    "name": "Michael Cera"
                }, {
                    "avatarUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk1NjQ3NTYyNF5BMl5BanBnXkFtZTcwODU4NzQ4NQ@@._V1_UX214_CR0,0,214,317_AL_.jpg",
                    "character": "Batgirl",
                    "name": "Rosario Dawson"
                }, {
                    "avatarUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMzc5MjE1NDgyN15BMl5BanBnXkFtZTcwNzg2ODgwNA@@._V1_UY317_CR14,0,214,317_AL_.jpg",
                    "character": "Alfred Pennyworth",
                    "name": "Ralph Fiennes"
                }, {
                    "avatarUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQwNzI3NjIwMV5BMl5BanBnXkFtZTcwMzA1OTIwMw@@._V1_UY317_CR1,0,214,317_AL_.jpg",
                    "character": "Joker",
                    "name": "Zach Galifianakis"
                }, {
                    "avatarUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BODE0NTkyMDgxOV5BMl5BanBnXkFtZTgwMjExNTc1NDE@._V1_UX214_CR0,0,214,317_AL_.jpg",
                    "character": "Harley Quinn",
                    "name": "Jenny Slate"
                }],
                "criticReviews": [{
                    "company": "The Atlantic",
                    "name": "David Sims",
                    "text": "The Lego Batman Movie works precisely because it knows audiences are sick of its hero. It's a reassessment, an intervention, an effort to try and remember what's fun about him."
                }, {
                    "company": "Christian Science Monitor",
                    "name": "Peter Rainer",
                    "text": "The sequel of sorts... is not quite as good, but at its best, it has the same whiplash wit and inspired freneticism."
                }, {
                    "company": "The New Republic",
                    "name": " Will Leitch",
                    "text": "The thing about a sequel or a spinoff, even a mostly fun one like The LEGO Batman Movie, is that it's hard to recreate enthusiasm and inventiveness. What was once new is now, already, routine."
                }],
                "posterUrl": "assets/images/lego_batman.jpg",
                "ratings": {
                    "commonSenseMedia": {
                        "name": "Common Sense Media",
                        "rating": "4/5"
                    },
                    "imdb": {
                        "name": "Internet Movie Database",
                        "rating": "8/10"
                    },
                    "rottenTomatoes": {
                        "name": "Rotten Tomatoes",
                        "rating": "71%"
                    }
                },
                "showtimes": [{
                    "3d": [{
                        "showtime": "1:00pm"
                    }, {
                        "showtime": "3:30pm"
                    }, {
                        "showtime": "6:00pm"
                    }, {
                        "showtime": "8:30pm"
                    }, {
                        "showtime": "10:25pm"
                    }, {
                        "showtime": "12:05am"
                    }],
                    "date": "2017-04-06",
                    "standard": [{
                        "showtime": "2:00pm"
                    }, {
                        "showtime": "4:30pm"
                    }, {
                        "showtime": "7:00pm"
                    }, {
                        "showtime": "9:30pm"
                    }, {
                        "showtime": "11:30pm"
                    }, {
                        "showtime": "1:00am"
                    }]
                }],
                "synopsis": "A cooler-than-ever Bruce Wayne must deal with the usual suspects as they plan to rule Gotham City, while discovering that he has accidentally adopted a teenage orphan who wishes to become his sidekick.",
                "title": "The Lego Batman Movie",
                "trailerUrl": "https://www.youtube.com/embed/h6DOpfJzmo0",
                "year": 2017
            },
            "name": "New Poster"
        }

    }
}
