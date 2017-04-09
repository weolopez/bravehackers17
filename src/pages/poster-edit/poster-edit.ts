import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController, NavParams } from 'ionic-angular';
import { PosterService } from "../../providers/poster.service";
import { M2XService } from "../../providers/m2x.service";

@Component({
  selector: 'page-poster-edit',
  templateUrl: 'poster-edit.html'
})
export class PosterEditPage {
  public poster: FirebaseObjectObservable<any>;
  public copy;
  public id;
  public key='d799d942e16376f6f1abb66fad955338';
  constructor(
    private af: AngularFire,
    private m2x: M2XService,
    private navParams: NavParams
  ) {
    console.dir(navParams.data);
    if (navParams.data.$key) {
      this.poster = af.database.object('/posters/' + navParams.data.$key);
      this.poster.subscribe( c=>this.copy=c)
    } else {
      this.id = navParams.data.id;
      this.copy = navParams.data;
    }
  }
  edit() {
    if (!this.poster) {
      if (!this.copy['metadata']) this.copy = 'empty';
      else this.copy = this.copy['metadata'] ;
    console.dir(this.copy);
    }
  }
  save() {
    let c = JSON.parse(this.copy);
    console.log(c);
    console.log(this.copy);
    if (this.poster) this.poster.set(JSON.parse(this.copy));
    else this.m2x.setMetaData(c, this.id, this.key)
            .subscribe(r=>
            console.dir(r)
            );
  }
}