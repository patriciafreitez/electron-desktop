import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {NavController} from '@ionic/angular';
import {MessageService} from '../service/message.service';
import {FirebaseAuth} from '../enum/firebase-auth.enum';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email = '';
  public pass = '';

  constructor(
    private navController: NavController,
    private angularFireAuth: AngularFireAuth,
    private message: MessageService,
    private storage: Storage
  ) {}

  ngOnInit() {}

  register() {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(this.email, this.pass).then(res => {
      this.navController.navigateRoot(['basico']);
    });
  }

  login() {
    this.angularFireAuth.auth.signInWithEmailAndPassword(this.email, this.pass).then(res => {
      this.storage.set('email', this.email);
      this.navController.navigateRoot(['mensajeria']);
    }).catch( (error) => {
      switch (error.code) {
        case FirebaseAuth.INVALID_EMAIL:
          this.message.alertOk('Información', '', 'Ingrese un email valido.');
          break;
        case FirebaseAuth.USER_NOT_FOUND:
          this.message.alertOk('Información', '', 'Usuario no registrado.');
          break;
        case FirebaseAuth.WRONG_PASSWORD:
          this.message.alertOk('Información', '', 'Contraseña incorrecta.');
          break;
      }
    });
  }

}
