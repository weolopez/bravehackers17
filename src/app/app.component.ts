import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
//import { SignupPage } from '../pages/signup/signup' 
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SchedulePage } from '../pages/schedule/schedule';
import { SupportPage } from '../pages/support/support';
import { HomePage } from "../pages/home/home";

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { CalendarPage } from "../pages/calendar/calendar";
import { ApiaiService } from './services/apiai.service';
import { PosterListPage } from "../pages/poster-list/poster-list";
import { MovieListPage } from "../pages/movie-list/movie-list";
import { Http } from "@angular/http";


export interface PageInterface {
  title: string;
  component?: any;
  icon: string;
  link?: string;
  logsOut?: boolean;
  logsIn?: boolean;
  index?: number;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html',
  providers: [ApiaiService]
})
export class DigitalInteractivePosterManagementApp {
  isMenuActive: any;
  lastMessage: any;

  private unregisterKeyboardListener;
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    /**
     * 
     * 
        { title: 'Schedule', component: TabsPage, tabComponent: SchedulePage, icon: 'calendar' },
        { title: 'Calendar', component: CalendarPage, icon: 'calendar' },
        { title: 'Demo', component: HomePage, icon: 'calendar' },
        { title: 'Theaters', component: TabsPage, tabComponent: MapPage, index: 2, icon: 'map' },
        { title: 'Posters', component: TabsPage, tabComponent: PosterListPage, index: 3, icon: 'film' },
     */
    { title: 'AT&T IoT Platform', link: 'http://m2x.att.com', index: 0, icon: 'm2x1.jpg' },
    { title: 'api.ai intents', link: 'https://console.api.ai/api-client/#/agent/fe732d66-e9b4-4915-8331-31d5bee7266a/intents', index: 0, icon: 'apiai.png' },
    { title: 'IBM Bluemix', link: 'https://console.ng.bluemix.net/dashboard/apps/', index: 0, icon: 'bluemix.png' },
    { title: 'Firebase', link: 'https://console.firebase.google.com/project/bravehackers17/database/data', index: 0, icon: 'firebase.png' },
    { title: 'About', component: AboutPage, icon: 'information-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Account', component: AccountPage, icon: 'person' },
    { title: 'Posters', component: PosterListPage, icon: 'film' },
    { title: 'Movies', component: MovieListPage, icon: 'videocam' },
    { title: 'Support', component: SupportPage, icon: 'help' },
    { title: 'Logout', component: TabsPage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in', logsIn: true },
    { title: 'Support', component: SupportPage, icon: 'help' }
    //{ title: 'Signup', component: SignupPage, icon: 'person-add' }
  ];
  rootPage: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public storage: Storage,
    public splashScreen: SplashScreen,
    private http: Http,
    //private wsService: WebSocketService
  ) {


    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.rootPage = AboutPage;
        this.platformReady()
      })

    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });

    this.listenToLoginEvents();
  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index === 0) {
      window.open(page.link, '_blank');
      return;
    }
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index }).catch(() => {
        console.log("Didn't set nav root");
      });
    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    let self = this;
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      
      this.events.subscribe('menu:up', () => this.up(this));
      this.events.subscribe('menu:down', () => this.down(this));
      //this.events.subscribe('menu:left', () => this.left(this));
      //this.events.subscribe('menu:right', () => this.right(this));
      this.events.subscribe('menu:escape', () => this.escape(this));
      //this.events.subscribe('menu:space', () => this.space(this));

      this.splashScreen.hide();
      this.unregisterKeyboardListener = this.platform.registerListener(this.platform.doc(), 'keydown', (event) => this.handleKeyboardEvents(event), {});

     // setTimeout(this.getData(), 1000);
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'primary';
    }
    return;
  }



  private serverURL = 'http://zltv2050.vci.att.com:8080/api/clients/bravehackers/3203/10/5650';
  getData() {
    /**
     * websocket implementation
    this.messages.subscribe(msg => {
     */
    this.http.get(this.serverURL)
      .map(resp => {
        let data = resp.json().content;
        return {
          id: data.id,
          value: data.value,
          message: 'UP'
        }
      })
      .subscribe(msg => {

        let mod = msg.value % 1;
        if (mod != this.lastMessage) {
          console.log("New Message: " + mod);
          this.lastMessage = mod;
        }
        else {
          console.log("Mod: " + mod);
          console.log("lastmessage: " + this.lastMessage);
          setTimeout(this.getData(), 1000);
          return;
        }

        console.log('Direction: ' + msg.message);

        if (msg.message === 'escape') this.events.publish('menu:escape');
        if (msg.message === 'space') this.events.publish('menu:space');

        if (Math.floor(msg.value) == 1) this.events.publish('menu:left');
        if (Math.floor(msg.value) == 2) this.events.publish('menu:right');
        if (Math.floor(msg.value) == 3) this.events.publish('menu:up');
        if (Math.floor(msg.value) == 4) this.events.publish('menu:down');

        setTimeout(this.getData(), 1000);
      })
  }

  up(o) {
    let app = o;
    if (!app.isMenuActive) {
      app.isMenuActive = true;
      app.events.publish('menu:activate');
    }
    else {
      app.isMenuActive = false;
      app.events.publish('menu:select');
    }
  }
  down(o) {
    let app = o;
    app.isMenuActive = false;
    app.events.publish('menu:escape');
    app.events.publish('menu:dismiss');
  }
  right(o) {
    let app = o;
   // app.events.publish('menu:right');
  }
  left(o) {
    let app = o;
   // app.events.publish('menu:left');
  }
  escape(o) {
    let app = o;
    app.isMenuActive = false;
  //  app.events.publish('menu:escape');
  }
  space(o) {
    let app = o;
    app.isMenuActive = false;
  //  app.events.publish('menu:help');
  }
  ionViewDidEnter() {
  }

  ionViewDidLeave() {
  }

  handleKeyboardEvents(event) {
    switch (event.key) {
      case "ArrowUp":
        this.events.publish('menu:up');
        break;

      case "ArrowDown":
        this.events.publish('menu:down');
        break;

      case "Escape":
        this.events.publish('menu:escape');
        break;

      case " ":
        this.events.publish('menu:space');
        break;

        //this.events.publish('menu:left');
        //this.events.publish('menu:right');
      default:
        break;
    }
  }

  startListeningToKeyboard() {
    this.stopListeningToKeyboard();
    this.unregisterKeyboardListener = this.platform.registerListener(this.platform.doc(), 'keydown', (event) => this.handleKeyboardEvents(event), {});
    //this.slides.enableKeyboardControl(true);
  }

  stopListeningToKeyboard() {
    if (this.unregisterKeyboardListener) {
      this.unregisterKeyboardListener();
    }
    //this.slides.enableKeyboardControl(false);
  }


}
