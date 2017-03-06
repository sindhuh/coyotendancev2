import { Component } from '@angular/core';
import { Page, Toast, NavController, Loading, Events } from 'ionic-angular';
import {Backend} from '../../providers/backend/backend';
import {SignupPage} from '../signup/signup'
import {ProfessorMainPage} from '../professor-main/professor-main';
import {StudentTabsPage} from '../student-tabs/student-tabs';

@Component({
  templateUrl: 'build/pages/login/login.html',
})

export class LoginPage {
  email: any;
  password: any;
  token: any;
  userObject: any;
  constructor(public nav: NavController, public backend: Backend, public events: Events) {
    this.nav = nav;
    this.email = "";
    this.password = "";
  }

  ionViewDidEnter() {
    var self = this;
    this.events.subscribe('user:loggedin', (userEventData) => {
      console.log("reachig login with mobile successfully");
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

  validateUser() {
    var user = {
      email: this.email,
      password: this.password
    }
    if (!this.email || !this.password) {
      let toast = Toast.create({
        message: 'Please enter valid details',
        duration: 3000
      });
      this.nav.present(toast);
      return false;
    }

    let loading = Loading.create({
      content: 'Please wait...'
    });

    this.nav.present(loading);
    var self = this;
    this.backend.loginUser(user).then(function () {
      loading.dismiss();
    }).catch(function (e) {
      console.log("error invalid user", e);
    })
  }

  signIn() {
    this.nav.push(SignupPage);
  }
}
