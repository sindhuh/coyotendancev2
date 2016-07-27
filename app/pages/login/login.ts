import { Component } from '@angular/core';
import { Page, Toast, NavController, Loading } from 'ionic-angular';
import {Backend} from '../../providers/backend/backend';

@Component({
  templateUrl: 'build/pages/login/login.html',
})

export class LoginPage {
  email: any;
  password: any;
  token: any;
  userObject: any;
  constructor(public nav: NavController, public backend: Backend) {
    this.nav = nav;
    this.email = "";
    this.password = "";
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
}
