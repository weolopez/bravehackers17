import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import { MovieService } from "../../providers/movie.service";

@Component({
  selector: 'page-showtimes',
  templateUrl: 'showtimes.html'
})

export class ShowTimesPage {
  public selectedMovie = {};

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public movieService: MovieService
  ) {
  }

  ngOnInit() {
        this.selectedMovie = this.movieService.getSelectedMovie();
  }

}
