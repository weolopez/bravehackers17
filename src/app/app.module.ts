import { NgModule, LOCALE_ID } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { DigitalInteractivePosterManagementApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { CalendarPage } from '../pages/calendar/calendar';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { MrtdataPage } from '../pages/mrtdata/mrtdata';
import { ChatBubble } from '../pages/components/chatBubble/chatBubble';
import { HomePage } from '../pages/home/home';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { MovieData } from '../providers/movie-data';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { JsonpModule } from '@angular/http';
import { NgCalendarModule } from 'ionic2-calendar';
import { PosterListPage } from "../pages/poster-list/poster-list";
import { PosterEditPage } from "../pages/poster-edit/poster-edit";
import { PosterViewPage } from "../pages/poster-view/poster-view";
import { PosterService } from "../providers/poster.service";
import { MovieListPage } from "../pages/movie-list/movie-list";
import { MovieEditPage } from "../pages/movie-edit/movie-edit";
import { M2XService } from "../providers/m2x.service";

import {MenuComponent} from '../components/menu/menu';

import {BrowserModule} from '@angular/platform-browser';

/** videogular */
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

import { SinglePlayerModule } from "../components/single-player/single-player.module";
import { MenuPage } from "../pages/menu/menu";
import { PosterPage } from "../pages/poster/poster";
import { ShowTimesPage } from "../pages/showtimes/showtimes";
import { MovieService } from "../providers/movie.service";
import { ActorsPage } from "../pages/actors/actors";
import { ImdbPage } from "../pages/imdb/imdb";
import { InstructionsPage } from "../pages/instructions/instructions";
import { RatingsPage } from "../pages/ratings/ratings";
import { TicketsPage } from "../pages/tickets/tickets";
import { TrailerPage } from "../pages/trailer/trailer";

export const firebaseConfig = {
    apiKey: "AIzaSyDQ1wWxzlqkGMuB6bL4bQmeyVH7-OfDgzM",
    authDomain: "bravehackers17.firebaseapp.com",
    databaseURL: "https://bravehackers17.firebaseio.com",
    storageBucket: "bravehackers17.appspot.com",
    messagingSenderId: "236868911507"
};

@NgModule({
  declarations: [
    DigitalInteractivePosterManagementApp,
    CalendarPage,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    TabsPage,
    MenuPage,
    TutorialPage,
    MrtdataPage,
    ChatBubble,
    SupportPage,
    MovieListPage,
    MovieEditPage,
    PosterListPage,
    PosterViewPage,
    PosterEditPage,
    PosterPage,
    HomePage,
    ShowTimesPage,
    ActorsPage,
    ImdbPage,
    InstructionsPage,
    RatingsPage,
    TicketsPage,
    TrailerPage,
    MenuComponent
  ],
  imports: [      
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        SinglePlayerModule,
        
        BrowserModule,
    NgCalendarModule,
    IonicModule.forRoot(DigitalInteractivePosterManagementApp),
		IonicStorageModule.forRoot(),
    JsonpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DigitalInteractivePosterManagementApp,
    AboutPage,
    CalendarPage,
    AccountPage,
    LoginPage,
    MenuPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    MrtdataPage,
    MovieListPage,
    MovieEditPage,
    PosterListPage,
    PosterEditPage,
    PosterViewPage,
    PosterPage,
    ShowTimesPage,
    ActorsPage,
    ImdbPage,
    InstructionsPage,
    RatingsPage,
    TicketsPage,
    TrailerPage,
    HomePage
       
  ],
  providers: [
    ConferenceData,
    UserData,
    M2XService,
    PosterService,
    MovieService,
    MovieData,
    InAppBrowser,
    SplashScreen,
    { provide: LOCALE_ID, useValue: undefined }
  ]
})
export class AppModule { }
