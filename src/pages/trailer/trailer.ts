import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieService } from "../../providers/movie.service";


@Component({
  selector: 'page-trailer',
  templateUrl: 'trailer.html'
})

export class TrailerPage {

  public selectedMovie;

  constructor(public navCtrl: NavController, 
              public platform: Platform, 
              public sanitizer: DomSanitizer, 
              private movieService: MovieService) {

  }
  ngOnInit() {
    this.selectedMovie = this.movieService.getSelectedMovie();
  }

  getSafeTrailerUrl() {
    let safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedMovie.trailerUrl + "?autoplay=1");
    return safeUrl;
  }

}
