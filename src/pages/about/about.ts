import { Component } from '@angular/core';

import { PopoverController, Gesture } from 'ionic-angular';

import { PopoverPage } from '../about-popover/about-popover';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  conferenceDate = '2047-05-17';
  public posters = [
    'guy.jpg',
    'poster.jpg',
    'learn.jpg',
    'activate.jpg',
    'select.jpg',
    'trailer.jpg',
    'show.jpg',
    'about.jpg',
    'ratings.jpg',
    'menu-tickets.jpg',
    'tickets.jpg',
    'number.jpg',
    'purchase.jpg',
    'code.jpg'
  ]
  constructor(public popoverCtrl: PopoverController) { }
  swipe($event:Gesture) {
    console.log('Event: '+$event.direction);
    console.dir($event);
  }
  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
}
