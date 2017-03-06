import { Component } from '@angular/core';
import { Page, Toast, NavController,Loading, Alert } from 'ionic-angular';
import {Backend} from '../../providers/backend/backend';
import {LoginPage} from'../login/login'
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

    let loading = Loading.create({
      content: 'Please wait...'
    });

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
      coyoteID: "ID : " +this.coyoteID,
      email: this.email,
      password: this.password,
      isProfessor: this.isProfessor
    }
    
    var self = this;
    this.backend.registerUser(user).then(function(data) {
        setTimeout(() => {
          loading.dismiss();
        });
        let alert = Alert.create({
          title: "Congrats :)",
          subTitle: "Successfull Registered!",
          buttons: ['OK']
        });
       //self.nav.present(alert);
       self.nav.push(LoginPage);
    })
  }
}
