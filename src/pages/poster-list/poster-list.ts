import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController } from 'ionic-angular';
import { PosterEditPage } from "../poster-edit/poster-edit";

@Component({
  selector: 'page-poster-list',
  templateUrl: 'poster-list.html'
})
export class PosterListPage {
  posters: FirebaseListObservable<any>;
  constructor(
    public af: AngularFire,
    public nav: NavController
  ) {
    this.posters = af.database.list('/posters');
  }
  edit(poster) {
    this.nav.push(PosterEditPage, poster);
  }
}