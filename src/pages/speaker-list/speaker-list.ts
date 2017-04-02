import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';
import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
import { MovieData } from '../../providers/movie-data';
import { M2EService } from "../../providers/m2e.service";

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html'
})
export class SpeakerListPage {
    m2eData: any;
  actionSheet: ActionSheet;
  speakers: any[] = [];
  fan: any;
  movies: any;
  items: FirebaseListObservable<any>;
    public url ='9f02f28d67fac9f23933ba44e6093e31';
    public key = 'c7a04867e5c3afe472c34bcd09507037';
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public movieData: MovieData,
    public config: Config,
    public inAppBrowser: InAppBrowser,
    public af: AngularFire,
    public m2e: M2EService
  ) { 
    this.movies = af.database.list('/movies');

    this.movieData.loadRSS('comingsoonmovies')
        .subscribe( data => this.setMovies(data.json()));   

    this.items = af.database.list('/messages');   

  }

  getDeviceData() {
    this.m2e.getM2E(this.url, this.key).subscribe(
      data => this.m2eData = JSON.stringify(data.json(), undefined, 4)
      //console.dir(data)
      );
  }
  movieSave(data) {
  /*  if (this.movies === undefined) {
      return false;
    };

    if (this.movies.find(function(m){
      return m.title === data.title;
    }).length > 0) return true;
    else this.movies.push({title: 'data.title'}).catch(err=>this.movies=null);
    return false;
  */   
  }
  setMovies(data) {
    this.fan = data;    
    this.fan.items.forEach(element => {
      let m = this.movies.find(movie=>movie===element);
      console.dir(m);
      if (m.length === 0 ) this.movies.push(element);
      else {
        console.log(m);
      }
    });
    console.dir(data);
  }

  addItem(newName: string) {
    this.items.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.items.update(key, { text: newText });
  }
  deleteItem(key: string) {    
    this.items.remove(key); 
  }
  deleteEverything() {
    this.items.remove();
  }
  ionViewDidLoad() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, session);
  }

  goToSpeakerDetail(speakerName: any) {
    this.navCtrl.push(SpeakerDetailPage, speakerName);
  }

  goToSpeakerTwitter(speaker: any) {
    this.inAppBrowser.create(`https://twitter.com/${speaker.twitter}`, '_blank');
  }

  openSpeakerShare(speaker: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: ($event: Event) => {
            console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
            if ((window as any)['cordova'] && (window as any)['cordova'].plugins.clipboard) {
              (window as any)['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  openContact(speaker: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        }
      ]
    });

    actionSheet.present();
  }
  syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
}
