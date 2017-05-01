import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
//import { InstructionsPage } from '../instructions/instructions';
//import { ApiaiService } from '../../app/services/apiai.service';
import { MovieService } from '../../app/services/movie.service';
import { NavController, ModalController, Modal, Platform, ViewController, Gesture, Events } from 'ionic-angular';
//import { AnalyticsService } from "../../app/services/analytics.service";
import { M2XService } from "../../app/services/m2x.service";
import { MenuPage } from "../../pages/menu/menu";
declare var webkitSpeechRecognition: any;

//import { ShowTimesPage } from '../../pages/showtimes/showtimes';
//import { ImdbPage } from '../../pages/imdb/imdb';
//import { RatingsPage } from '../../pages/ratings/ratings';
//import { TicketsPage } from '../../pages/tickets/tickets';
//import { TrailerPage } from '../../pages/trailer/trailer';



@Component({
  selector: 'bh-menu',
  templateUrl: 'menu.html'
})

export class MenuComponent {

  @ViewChild('mainpage') mainpage: ElementRef;

  private modal: Modal;
  private modalShowing: Boolean;
  private showingPurchase = false;
  public selectedMovie = {};

  private isListening: Boolean;
  private recognition: any;
  private intents: any;
  public listeningText: string;

  constructor(
    public events: Events,
    //public navCtrl: NavController,
    public modalCtrl: ModalController,
    public platform: Platform,
    private changeDetector: ChangeDetectorRef
  //  public viewCtrl: ViewController,
    //private movieService: MovieService,
    //private m2x: M2XService,
   // private analytics: AnalyticsService
  //  private apiaiService: ApiaiService
    ) {
    this.getMovie();

    this.intents = new Map();

  }

  ngOnInit() {
    console.log("OnInit Ran...");

    this.intents = new Map();

    this.loadIntents();
    //this.analytics.loadImages();
    this.events.subscribe('menu:activate', () => {
      if (!this.showingPurchase) this.activateMenu() 
    });
    this.events.subscribe('menu:select', () => {
      if (!this.showingPurchase) this.activateMenuItem();
    });

    this.events.subscribe('menu:escape', () => {
      this.stopRecognition();
      this.showingPurchase = false;
      if (!this.modal) return;
      this.modal.dismiss();
    });

  //  this.events.subscribe('menu:help', () => this.presentModal(InstructionsPage));

  }


  getMovie() {
 /**
  * 
     this.movieService.getMovie().subscribe(r => {
      r.subscribe(movie => {
        console.log('getting movie')
        console.dir(movie);
        this.selectedMovie = movie
      })
    })
  */
  }

  presentModal(page) {
    if (!this.modalShowing) {
      //if (!this.modal) 
      this.modal = this.modalCtrl.create(page, {}, { showBackdrop: false });
      //else 
      this.modal.onDidDismiss(() => {
        this.getMovie();
        this.modalShowing = false
      })
      this.modal.present();
      this.modalShowing = true;
    } else {
      this.modalShowing = false;
      this.modal.dismiss();
      this.presentModal(page);
    }

  }

  activateMenu() {

    this.initializeListeningText();
    this.startRecognition();

    let self = this;
    self.presentModal(MenuPage);
    //self.analytics.analyzeImage();
   /* self.m2x.postData(
      {
        "timestamp": new Date().toISOString(),
        "values": {
          "movieName": self.selectedMovie['title']
        }
      }
    ).subscribe((result) => {
      console.log(result);
    }, (error) => {
      console.log(error);
    });
    */
  }


  itemSelected(itemIndex) {
    let menuItem = this.menuItems[itemIndex];
  //  let page = menuItem.buttonPage;
    //   if (menuItem.presentAs == "page") {
    //   this.gotoPage(page);
    //} else if (menuItem.presentAs == "modal") {
   // this.presentModal(page);
    if (menuItem.title === 'Purchase Tickets') this.showingPurchase = true;
    //   }
  }

  activateMenuItem() {
    let activeButton = document.querySelectorAll('.swiper-slide-next .menu-item')[0];
    //this.mainpage.nativeElement.querySelector('.swiper-slide-next .menu-item');
    let menuItemIndex = activeButton.attributes["data-menu-item"].value;
    this.itemSelected(menuItemIndex);
  }

  menuItems = [
    {
      title: "Show Times",
      icon: "assets/images/svg/showTimesIco.svg",
     // buttonPage: ShowTimesPage,
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
     // buttonPage: ImdbPage,
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
     // buttonPage: RatingsPage,
      presentAs: "modal"
    }
  ];

/**
 * Audio reated methods
 * TODO move out and trigger from event pattern
 */

  startRecognition() {
    this.platform.ready().then(() => {

      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.onstart = (event => {
        this.isListening = true;
        this.tryToDetectChanges();
      });
      this.recognition.onend = (event => {
        this.isListening = false;
        this.tryToDetectChanges();
      });
      //this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.onnomatch = (event => {
        //this.listeningText = event.results[0][0].transcript;
        this.tryToDetectChanges();
      });
      this.recognition.onerror = (event => {
        //this.listeningText = event.results[0][0].transcript;
        this.tryToDetectChanges();
      });
      this.recognition.onresult = (event => {
        this.listeningText = event.results[0][0].transcript;
        this.tryToDetectChanges();
        if (event.results.length > 0) {
          console.log('Output STT: ', event.results[0][0].transcript);
          setTimeout(() => {
            this.ask(event.results[0][0].transcript);
          }, 1000);
        }
      });
      this.recognition.start();
    });
  }

  tryToDetectChanges() {
    try {
      this.changeDetector.detectChanges();
    } catch (error) {
      console.log(error);
    }
  }

  stopRecognition() {
    if (this.recognition) {
      this.recognition.stop();
      this.recognition = null;
    }
  }

  ask(text: any) {
    /**
     * Move to service communicate via event
     this.apiaiService.send(text).subscribe(response => {
         console.log(response);
         let page = this.intents.get(response.result.action);
       //  this.analytics.addSpeech(text,response.result.action );
         if (null!=page) {
            this.listeningText = response.result.speech;
            this.tryToDetectChanges();
            setTimeout(() => {
              this.itemSelected(page)
              this.initializeListeningText();
            }, 1000);
         } else {
            if (text == "help") {
    //          this.presentModal(InstructionsPage);
            }
            setTimeout(() => {
              this.initializeListeningText();
              this.startRecognition();
            }, 1000);
         }
     });
     */
  }

  initializeListeningText() {
    this.listeningText = "Listening...";
  }

  loadIntents() {
    this.intents.set('show-schedule', 0);
    this.intents.set('show-tickets', 1);
    this.intents.set('show-info', 2);
    this.intents.set('show-trailer', 3);
    this.intents.set('show-review', 4);
    this.intents.set('input.unknown', null);
    this.intents.set('smalltalk.greetings', 4);
  }

}
