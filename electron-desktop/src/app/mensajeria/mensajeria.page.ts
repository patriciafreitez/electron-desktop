import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { UserService } from '../service/db/user.service';

import { MessageService } from '../service/message.service';
import { Mensaje } from '../../app/models/mensaje';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.page.html',
  styleUrls: ['./mensajeria.page.scss'],
})
export class MensajeriaPage implements OnInit {
  public mensajeList$: Observable<Mensaje[]>;
  public isRoot = false;
  public msj = '';

  constructor(
    public route: ActivatedRoute,
    private navController: NavController,
    private angularFireAuth: AngularFireAuth,
    private storage: Storage,
    private userService: UserService,
    private messageService: MessageService,
    public alertController: AlertController
  ) {
    this.isUserRoot();
  }

  enviarMensaje(){
    if(this.msj.trim().length > 0) {
      const mensaje : Mensaje = {
        contenido : this.msj,
        fecha : moment().format("YYYY-MM-DD[T]HH:mm:ss"),
      }
      this.messageService.addMensaje(mensaje);
      this.msj = "";
    }
  }

  ngOnInit() {
   this._loadMensaje();
  }

  _loadMensaje(){
    this.mensajeList$ = this.messageService.getMensajeList().valueChanges(); //un obsevable
  }

  abrirFormulario() {
    const params = { disabled: false, paciente: null };
    this.storage.set('disabled', params).then(() => {
      this.storage.remove('form').then(() =>
        this.navController.navigateForward('basico')
      );
    })
  }

  isUserRoot() {
    this.storage.get('email').then(email => {
      this.userService.findByEmail(email).snapshotChanges().subscribe(changes => {
        this.isRoot = changes.length > 0;
        this.storage.set('root', this.isRoot);
      });
    });
  }
  
  cerrarSesion() {
    this.angularFireAuth.auth.signOut().then(() => {
      this.storage.remove('email');
      this.storage.remove('root');

      this.navController.navigateRoot(['']);
    }).catch((error) => {
      console.log(error);
    });
  }

  async presentAlertConfirm(mensaje: Mensaje) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Desea borrar el mensaje? <p>${mensaje.contenido}</p>`,
      cssClass: 'custom-select',
        buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Eliminar',
          handler: () => {
            this.messageService.removeMensaje(mensaje);
          }
        }
      ]
    });

    await alert.present();
  }
}
