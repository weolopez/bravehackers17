import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController, NavParams } from 'ionic-angular';
import { PosterService } from "../../providers/poster.service";
import { M2XService } from "../../providers/m2x.service";
import { PosterListPage } from "../poster-list/poster-list";

@Component({
  selector: 'page-poster-edit',
  templateUrl: 'poster-edit.html'
})
export class PosterEditPage {
  public movies: FirebaseListObservable<any>;
  public copy;
  public id;
  public metadata;
  public movie;
  constructor(
    private af: AngularFire,
    public nav: NavController,
    private m2x: M2XService,
    private navParams: NavParams
  ) {
    console.dir(navParams.data);
      this.id = navParams.data.id;
      this.copy = navParams.data;
      this.m2x.getMetaData(this.id).map(r=>this.metadata=r.json()).subscribe(r=>this.movie=r.movieid)
      this.movies = af.database.list('/movies');
  }
  edit() {
    this.movie
      if (!this.copy['metadata']) this.copy = 'empty';
      else this.copy = this.copy['metadata'] ;
  }
  save() {
    let c={
      'name': this.copy.name,
      'visibility': this.copy.visibility,
      'description': this.copy.description,
      'serial': this.copy.serial,
      'metadata' : {
          'movieid': this.movie
        }
    }
    this.m2x.setDetails(c, this.id)
            .subscribe(r=> {
                console.dir(r);
                this.nav.setRoot(PosterListPage);
            });
  }
}