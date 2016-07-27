import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {SignupPage} from '../signup/signup';
import {ProfessorMainPage} from "../professor-main/professor-main";
import {StudentTabsPage} from "../student-tabs/student-tabs";
import {Backend} from '../../providers/backend/backend';

@Component({
  templateUrl: 'build/pages/auth/auth.html',
})

export class AuthPage {
  tab1Root: any = LoginPage;
  tab2Root: any = SignupPage;
  constructor(public nav: NavController, public backend: Backend, public events: Events) {
  }

  ionViewDidEnter() {
    var self = this;
    this.events.subscribe('user:loggedin', (userEventData) => {
      self.goToMainPageIfLoggedIn();
    });
    this.goToMainPageIfLoggedIn();
  }

  goToMainPageIfLoggedIn() {
    let userDetails = this.backend.userDetails;
    if (userDetails) {
      if (userDetails.isProfessor) {
        this.nav.setRoot(ProfessorMainPage);
      } else {
        this.nav.setRoot(StudentTabsPage);
      }
    }
  }

}
