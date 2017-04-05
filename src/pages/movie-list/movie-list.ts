import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController } from 'ionic-angular';
import { MovieEditPage } from "../movie-edit/movie-edit";

@Component({
  selector: 'page-movie-list',
  templateUrl: 'movie-list.html'
})
export class MovieListPage {
  movies: FirebaseListObservable<any>;
  constructor(
    public af: AngularFire,
    public nav: NavController
  ) {
    this.movies = af.database.list('/movies');
  }
  edit(movie) {
    this.nav.push(MovieEditPage, movie);
  }
}