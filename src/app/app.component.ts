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
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { SupportPage } from '../pages/support/support';
import { HomePage } from "../pages/home/home";

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { CalendarPage } from "../pages/calendar/calendar";
import { ApiaiService } from './services/apiai.service';
import { PosterListPage } from "../pages/poster-list/poster-list";
import { MovieListPage } from "../pages/movie-list/movie-list";


export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  logsIn?: boolean;
  index?: number;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html',
  providers: [ApiaiService]
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
/**
 * 
    { title: 'Schedule', component: TabsPage, tabComponent: SchedulePage, icon: 'calendar' },
    { title: 'Calendar', component: CalendarPage, icon: 'calendar' },
    { title: 'Demo', component: HomePage, icon: 'calendar' },
    { title: 'Movies', component: TabsPage, tabComponent: SpeakerListPage, index: 1, icon: 'videocam' },
    { title: 'Theaters', component: TabsPage, tabComponent: MapPage, index: 2, icon: 'map' },
    { title: 'Posters', component: TabsPage, tabComponent: PosterListPage, index: 3, icon: 'film' },
 */
    { title: 'Posters', component: PosterListPage, icon: 'film' },
    { title: 'Movies', component: MovieListPage, icon: 'videocam' },
    { title: 'About', component: TabsPage, tabComponent: AboutPage, index: 4, icon: 'information-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Account', component: AccountPage, icon: 'person' },
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
    public splashScreen: SplashScreen
  ) {

    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.rootPage = PosterListPage;
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
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
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
}
