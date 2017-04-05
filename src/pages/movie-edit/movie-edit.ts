import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-movie-edit',
  templateUrl: 'movie-edit.html'
})
export class MovieEditPage {
  public movie: FirebaseObjectObservable<any>;
  constructor(
    private af: AngularFire,
    private navParams: NavParams
  ) {
    let key = '';
    if (!navParams.data.$key) key = this.newPoster();
    else key = navParams.data.$key;
    this.movie = af.database.object('/movies/' + key)
  }

  newPoster() {
    const movies = this.af.database.list('/movies');
    return movies.push(
      {
        "cast": [{
          "avatarUrl": "",
          "character": "",
          "name": ""
        }],
        "criticReviews": [{
          "company": "The Atlantic",
          "name": "",
          "text": ""
        }, {
          "company": "Christian Science Monitor",
          "name": "",
          "text": ""
        }, {
          "company": "The New Republic",
          "name": "",
          "text": ""
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
        "synopsis": "A cooler-than-ever Bruce Wayne must deal with the usual suspects as they plan to rule Gotham City, while discovering that he has accidentally adopted a teenage orphan who wishes to become his sidekick.",
        "title": "The Lego Batman Movie",
        "trailerUrl": "https://www.youtube.com/embed/h6DOpfJzmo0",
        "year": 2017
      }
    ).key;
  }
}