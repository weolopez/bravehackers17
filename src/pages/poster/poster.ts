import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController, NavParams } from 'ionic-angular';
import { PosterService } from "../../providers/poster.service";
import { M2XService } from "../../providers/m2x.service";

@Component({
  selector: 'page-poster',
  templateUrl: 'poster.html'
})
export class PosterPage {
  movie: FirebaseObjectObservable<any>;
  movieid: any;
  m2xposterid: any;
  m2xposters = [];
  constructor(
    private af: AngularFire,
    public nav: NavController,
    private m2x: M2XService,
    private navParams: NavParams
  ) {
    console.dir(navParams.data);
    this.list();
  }
  list() {
    this.m2x.list().map(data =>
      this.m2xposters = data.json().devices)
      .subscribe(data => {
        this.m2xposterid = data[0].id;
        this.m2xposterChange();        
        console.dir(this.m2xposterid);
      });
  }
  m2xposterChange() {
    this.m2x.getMetaData(this.m2xposterid)
      .map(r => this.movieid = r.json().movieid)
      .subscribe(r => {
        console.dir(r);
        this.af.database.object('/movies/' + this.movieid)
        .subscribe(r => {
          console.dir(r);
          this.movie = r;
        }, err => console.dir(err));
      }, e => console.dir(e));

  }
}