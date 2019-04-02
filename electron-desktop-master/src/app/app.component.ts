import { Component } from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/basico',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private navController: NavController,
    private angularFireAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('ready');

      this.angularFireAuth.auth.onAuthStateChanged((user) => {
        if (user) {
           this.navController.navigateRoot(['mensajeria']);
        } else {
          this.navController.navigateRoot(['']);
        }
      });
    });
  }
}
