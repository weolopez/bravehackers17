import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { M2XService } from "./m2x.service";

@Injectable()

export class MovieService{
    accessToken: String;
    movieUrl: string;
    private selectedMovie: any;
    public movie: FirebaseObjectObservable<any>;
    constructor(private http: Http,
                private m2x: M2XService,
                private af: AngularFire) {
    }
    getMovie(): Observable<any> {
      return this.m2x.getMetaData()
              .map(r=>r.json())
              .map(r=> {
                   r = r['movieid'];
                   this.movie = this.af.database.object('/movies/'+r);
                   this.movie.subscribe((movie) => {
                     this.setSelectedMovie(movie);
                   });
                   return this.movie;
              })
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
