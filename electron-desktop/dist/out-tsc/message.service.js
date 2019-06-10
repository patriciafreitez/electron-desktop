import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
/*export interface mensaje {
  key?: string;
  contenido: string;
  date : Date;
}*/
var MessageService = /** @class */ (function () {
    function MessageService(db) {
        this.db = db;
        this.mensajeListRef = this.db.list('mensaje-list');
    }
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
    /*sendMsgToFirebase(mensaje: Mensaje, contenido : string){
      this.db.list<Mensaje>('mensaje-list').doc(mensaje.key).update({
        mensajes : firestore.FieldValue.arrayUnion(mensaje),
      })
    }*/
    MessageService.prototype.getMensajeList = function () {
        return this.mensajeListRef;
    };
    MessageService.prototype.filterByDescripcion = function (contenido) {
        return this.db.list('/mensaje-list', function (ref) { return ref.orderByChild('contenido').equalTo(contenido); });
    };
    MessageService.prototype.addMensaje = function (mensaje) {
        return this.mensajeListRef.push(mensaje);
    };
    MessageService.prototype.addAllMensaje = function (mensaje) {
        var _this = this;
        mensaje.forEach(function (element) {
            _this.addMensaje(element);
        });
    };
    MessageService.prototype.editMensaje = function (mensaje) {
        return this.mensajeListRef.update(mensaje.key, mensaje);
    };
    MessageService.prototype.removeMensaje = function (mensaje) {
        return this.mensajeListRef.remove(mensaje.key);
    };
    MessageService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase])
    ], MessageService);
    return MessageService;
}());
export { MessageService };
//# sourceMappingURL=message.service.js.map