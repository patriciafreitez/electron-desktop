import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { Mensaje } from 'src/app/models/mensaje';
import { AngularFireDatabase } from '@angular/fire/database';

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


  /* //Copiado de inetrnet
      sendMessage(){
      let newData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
      newData.set({
        type:this.data.type,
        user:this.data.nickname,
        message:this.data.message,
        sendDate:Date()
      });
      this.data.message = '';
    }
    await alert.present();
  }*/

  getMensajeList() {
    return this.mensajeListRef;
  }
  
  filterByDescripcion(descripcion: string) {
    return this.db.list('/mensaje-list', ref => ref.orderByChild('descripcion').equalTo(descripcion));
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
