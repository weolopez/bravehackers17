import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController } from 'ionic-angular';
import { PosterEditPage } from "../poster-edit/poster-edit";
import { M2XService } from "../../providers/m2x.service";
import { PosterViewPage } from "../poster-view/poster-view";

@Component({
  selector: 'page-poster-list',
  templateUrl: 'poster-list.html'
})
export class PosterListPage {

  lists: string = 'firebase';
  posters: FirebaseListObservable<any>;
  m2xposters;
  constructor(
    public af: AngularFire,
    public nav: NavController,
    private m2x: M2XService
  ) {
    this.posters = af.database.list('/posters');
    this.list();
  }
  list() {
    this.m2xposters=null;
    this.m2x.list().map(data=>
       this.m2xposters = data.json().devices)
      .subscribe(data=>
        console.log('completed'));
    
  }
  add() {
    this.m2x.newM2XDevice().subscribe(r=>this.list());
  }
  edit(poster) {
      this.nav.push(PosterEditPage, poster);
  }
  view(poster) {
      this.nav.push(PosterViewPage, poster);
  }
  delete(p) {
    let poster = this.af.database.list('/posters'+p.$key);
    this.m2x.deleteDevice(p.id).map(r=>console.dir(r)).subscribe(r=>setTimeout(this.list(),3000),e=>console.dir(e));
    //poster.remove();
    
  }
  getName(item) {
    if (item.location)  if (item.location.name) return item.name+': '+item.location.name;
    return item.name+': '+item.id;
  }
}