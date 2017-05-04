import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'page-actor',
  templateUrl: 'actors.html'
})

export class ActorsPage {

  public actorUrl;

  constructor(public navCtrl: NavController, public platform: Platform, public sanitizer: DomSanitizer) {

  }

  getSafeTrailerUrl() {
    let safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.actorUrl);
    return safeUrl;
  }

}
