import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NavController, ViewController, Platform, Slides, ModalController, Modal, Events } from 'ionic-angular';

//import { ShowTimesPage } from '../../pages/showtimes/showtimes';
//import { ImdbPage } from '../../pages/imdb/imdb';
//import { RatingsPage } from '../../pages/ratings/ratings';
//import { TicketsPage } from '../../pages/tickets/tickets';
//import { TrailerPage } from '../../pages/trailer/trailer';
//import { InstructionsPage } from '../../pages/instructions/instructions';

//import { ApiaiService } from '../../app/services/apiai.service';
import { AnalyticsService } from "../../app/services/analytics.service";
import { ImdbPage } from "../imdb/imdb";

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})

export class MenuPage {

  @ViewChild('slides') slides: Slides;
  @ViewChild('slidesWrapper') slidesWrapper: ElementRef;

  private menuItems;

  constructor (
    public events: Events,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public platform: Platform,
    private element: ElementRef,
 //   public apiaiService: ApiaiService,
//    public analytics: AnalyticsService,
    private modalController: ModalController
  ) {

    this.events.subscribe('menu:right', () => this.slides.slideNext());
    this.events.subscribe('menu:left', () => this.slides.slidePrev());
  }
  ngOnInit() {
    this.menuItems = this.getMenuItems();

    // Make the modal full screen
    this.element.nativeElement.parentNode.classList.add("full-screen");
  }
/**
 * 


 */
  getMenuItems() {
    return  [
              {
                  title: "Show Times",
                  icon: "assets/images/svg/showTimesIco.svg",
               //   buttonPage: ShowTimesPage,
                  presentAs: "modal"
              },
              {
                  title: "Purchase Tickets",
                  icon: "assets/images/svg/ticketsIco.svg",
                 // buttonPage: TicketsPage,
                  presentAs: "modal"
              },
              {
                  title: "Info",
                  icon: "assets/images/svg/aboutIco.svg",
                  buttonPage: ImdbPage,
                  presentAs: "modal"
              },
              {
                  title: "View Trailer",
                  icon: "assets/images/svg/trailerIco.svg",
                 // buttonPage: TrailerPage,
                  presentAs: "modal"
              },
              {
                  title: "View Ratings",
                  icon: "assets/images/svg/ratingsIco.svg",
                  //buttonPage: RatingsPage,
                  presentAs: "modal"
              }
          ];
  }
}
