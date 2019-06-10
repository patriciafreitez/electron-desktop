import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
/*export interface mensaje {
  key?: string;
  contenido: string;
  date : Date;
}*/
var MessageService = /** @class */ (function () {
    function MessageService(db, alertController) {
        this.db = db;
        this.alertController = alertController;
        this.mensajeListRef = this.db.list('mensaje-list');
    }
    MessageService.prototype.alertOk = function (titulo, subtitulo, mensaje) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: titulo,
                            subHeader: subtitulo,
                            message: mensaje,
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.mensajeListRef.query.once('value').then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var pkey = childSnapshot.key;
                        var chval = childSnapshot.val();
                        if (mensaje.fecha === chval.fecha && mensaje.contenido === chval.contenido) {
                            _this.mensajeListRef.remove(pkey);
                            return true;
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    MessageService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase,
            AlertController])
    ], MessageService);
    return MessageService;
}());
export { MessageService };
//# sourceMappingURL=message.service.js.map