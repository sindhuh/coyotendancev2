import { Component } from '@angular/core';
import { Page, Toast, NavController } from 'ionic-angular';
import {Backend} from '../../providers/backend/backend';

@Component({
  templateUrl: 'build/pages/signup/signup.html',
})

export class SignupPage {
  name: any;
  email: any;
  password: any;
  user: any;
  coyoteID: any;
  isProfessor: boolean = false

  constructor(public nav: NavController, public backend: Backend) { }

  registerUser() {
    if (!this.email || !this.password || !this.name || !this.coyoteID) {
      let toast = Toast.create({
        message: 'Please enter valid details',
        duration: 3000
      });
      this.nav.present(toast);
      return false;
    }
    var user = {
      name: this.name,
      coyoteID: this.coyoteID,
      email: this.email,
      password: this.password,
      isProfessor: this.isProfessor
    }
    this.backend.registerUser(user).then(function () {
      console.log("successfully signup");
    })
  }
}
