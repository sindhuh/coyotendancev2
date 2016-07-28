import {Component, ViewChild} from '@angular/core';
import {App, ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {AuthPage} from './pages/auth/auth';
import {Backend} from './providers/backend/backend';
import {SettingsPage} from './pages/settings/settings';
import {UserProfilePage} from './pages/user-profile/user-profile';
import '../node_modules/chart.js/dist/Chart.bundle.min.js';


@Component({
  templateUrl: 'build/app.html',
  providers: [Backend]
})

class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = AuthPage;
  pages: Array<{ title: string, component: any }>;
  userObject: any;
  constructor( private platform: Platform, private menu: MenuController, private backend : Backend) {
    this.initializeApp();
    this.userObject = this.backend.userDetails;
    this.pages = [
      { title: 'Settings', component: SettingsPage },
      { title: 'Profile', component: UserProfilePage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
