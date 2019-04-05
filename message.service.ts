import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { Mensaje } from 'src/app/models/mensaje';
import { AngularFireDatabase } from '@angular/fire/database';
import { firestore } from 'firebase';
import { Key } from 'protractor';

/*export interface mensaje {
  key?: string;
  contenido: string;
  date : Date;
}*/

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private mensajeListRef = this.db.list<Mensaje>('mensaje-list');
  
  constructor(private db: AngularFireDatabase) { }
  //constructor(public alertController: AlertController) { }

  /*async alertOk(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  }*/
  /*getMensajes(id : string) { //retorna un solo observable
    return this.db.list('/mensaje-list').doc(id).valueChanges();
  }*/
  sendMsgToFirebase(mensaje: Mensaje, contenido : string){
    this.db.list<Mensaje>('mensaje-list').doc(mensaje.key).update({
      mensajes : firestore.FieldValue.arrayUnion(mensaje),
    })
  }
  getMensajeList() {
    return this.mensajeListRef;
  }
  filterByDescripcion(contenido: string) {
    return this.db.list('/mensaje-list', ref => ref.orderByChild('contenido').equalTo(contenido));
  }
  addMensaje(mensaje: Mensaje) {
    return this.mensajeListRef.push(mensaje);
  }
  addAllMensaje(mensaje: any) {
    mensaje.forEach((element:Mensaje) => {
      this.addMensaje(element)
      });
    }
  editMensaje(mensaje: Mensaje) {
    return this.mensajeListRef.update(mensaje.key, mensaje);
  }
  removeMensaje(mensaje: Mensaje) {
    return this.mensajeListRef.remove(mensaje.key);
  }

}
