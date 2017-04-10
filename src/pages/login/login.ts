import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import { AngularFire } from 'angularfire2';
import { AboutPage } from "../about/about";


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: { username?: string, password?: string } = {};
  submitted = false;

  constructor(public navCtrl: NavController, af: AngularFire, public userData: UserData) {
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signInWithGitHub().then(() => this.onSignInSuccess())
    }
  }

  private onSignInSuccess(): void {
    console.log("Facebook display name ", this.userData.displayName());
    this.userData.login(this.userData.displayName());
    this.navCtrl.push(AboutPage);
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
