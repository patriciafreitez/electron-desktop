import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { UserService } from '../service/db/user.service';
import { MessageService } from '../service/message.service';
import * as moment from 'moment';
var MensajeriaPage = /** @class */ (function () {
    function MensajeriaPage(route, navController, angularFireAuth, storage, userService, messageService, alertController) {
        this.route = route;
        this.navController = navController;
        this.angularFireAuth = angularFireAuth;
        this.storage = storage;
        this.userService = userService;
        this.messageService = messageService;
        this.alertController = alertController;
        this.isRoot = false;
        this.msj = '';
        this.isUserRoot();
    }
    MensajeriaPage.prototype.enviarMensaje = function () {
        if (this.msj.trim().length > 0) {
            var mensaje = {
                contenido: this.msj,
                fecha: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
            };
            this.messageService.addMensaje(mensaje);
            this.msj = "";
        }
    };
    MensajeriaPage.prototype.ngOnInit = function () {
        this._loadMensaje();
    };
    MensajeriaPage.prototype._loadMensaje = function () {
        this.mensajeList$ = this.messageService.getMensajeList().valueChanges(); //un obsevable
    };
    MensajeriaPage.prototype.abrirFormulario = function () {
        var _this = this;
        var params = { disabled: false, paciente: null };
        this.storage.set('disabled', params).then(function () {
            _this.storage.remove('form').then(function () {
                return _this.navController.navigateForward('basico');
            });
        });
    };
    MensajeriaPage.prototype.isUserRoot = function () {
        var _this = this;
        this.storage.get('email').then(function (email) {
            _this.userService.findByEmail(email).snapshotChanges().subscribe(function (changes) {
                _this.isRoot = changes.length > 0;
                _this.storage.set('root', _this.isRoot);
            });
        });
    };
    MensajeriaPage.prototype.cerrarSesion = function () {
        var _this = this;
        this.angularFireAuth.auth.signOut().then(function () {
            _this.storage.remove('email');
            _this.storage.remove('root');
            _this.navController.navigateRoot(['']);
        }).catch(function (error) {
            console.log(error);
        });
    };
    MensajeriaPage.prototype.presentAlertConfirm = function (mensaje) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirmación',
                            message: "\u00BFDesea borrar el mensaje? <p>" + mensaje.contenido + "</p>",
                            cssClass: 'custom-select',
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () { }
                                }, {
                                    text: 'Eliminar',
                                    handler: function () {
                                        _this.messageService.removeMensaje(mensaje);
                                    }
                                }
                            ]
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
    MensajeriaPage = tslib_1.__decorate([
        Component({
            selector: 'app-mensajeria',
            templateUrl: './mensajeria.page.html',
            styleUrls: ['./mensajeria.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            NavController,
            AngularFireAuth,
            Storage,
            UserService,
            MessageService,
            AlertController])
    ], MensajeriaPage);
    return MensajeriaPage;
}());
export { MensajeriaPage };
//# sourceMappingURL=mensajeria.page.js.map