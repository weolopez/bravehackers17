import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController } from 'ionic-angular';
import { PosterEditPage } from "../poster-edit/poster-edit";
import { M2XService } from "../../providers/m2x.service";

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
    m2x.list().subscribe(data=>
    //console.dir( data.json().devices));
    this.m2xposters = data.json().devices);
  }
  edit(poster) {
      this.nav.push(PosterEditPage, poster);
  }
  delete(p) {
    console.dir(p);
    alert('deleting: '+p.$key+' and '+p['m2eid']);
    let poster = this.af.database.list('/posters'+p.$key);
    this.m2x.deleteDevice(p.id).subscribe(r=>console.dir(r))
    //poster.remove();
  }
  getName(item) {
    if (item.location)  if (item.location.name) return item.location.name;
    return item.name;
  }
}