import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController, NavParams } from 'ionic-angular';
import { PosterService } from "../../providers/poster.service";

@Component({
  selector: 'page-poster-edit',
  templateUrl: 'poster-edit.html'
})
export class PosterEditPage {
  public poster: FirebaseObjectObservable<any>;
  public copy='';
  constructor(
    private af: AngularFire,
    private navParams: NavParams
  ) {
    this.poster = af.database.object('/posters/' + navParams.data.$key);
    this.poster.subscribe( c=>this.copy=c)
  }
  save() {
    this.poster.set(JSON.parse(this.copy));
  }
  
}