import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { UserService } from '../service/db/user.service';
import { MessageService } from '../service/message.service';
import { Mensaje } from '../../app/models/mensaje';
var MensajeriaPage = /** @class */ (function () {
    function MensajeriaPage(route, navController, angularFireAuth, storage, userService, messageService) {
        this.route = route;
        this.navController = navController;
        this.angularFireAuth = angularFireAuth;
        this.storage = storage;
        this.userService = userService;
        this.messageService = messageService;
        this.isRoot = false;
        this.mensajes = [];
        this.mensaje = Mensaje;
        this.isUserRoot();
        var arrayMensaje = [
            { contenido: "mensaje 1" },
            { date: Date }
        ];
        //messageService.addAllMensaje(arrayMensaje);
        var arrayEps = [
            { descripcion: "Subsidiado" },
            { descripcion: "Contributivo" },
            { descripcion: "Otro" },
            { descripcion: "Ninguno" },
        ];
        //eps.addAllEps(arrayEps);
        var arrayTipoDocumento = [
            { descripcion: "Tarjeta de Identidad" },
            { descripcion: "Registro Civil" },
            { descripcion: "Cedula de Ciudadania" },
            { descripcion: "Cedula de Extrangeria" },
            { descripcion: "Pasaporte" },
        ];
        //tipodocumento.addAllTipoDocumento(arrayTipoDocumento);
        var arrayGenero = [
            { descripcion: "Masculino" },
            { descripcion: "Femenino" },
        ];
        //genero.addAllGenero(arrayGenero);
        var arrayEstadoCivil = [
            { descripcion: "Soltero" },
            { descripcion: "Casado" },
            { descripcion: "Union libre" },
            { descripcion: "Viudo" },
        ];
        //estadocivil.addAllEstadoCivil(arrayEstadoCivil);
        var arrayNivelSocioeconomico = [
            { descripcion: "Alto" },
            { descripcion: "Medio" },
            { descripcion: "Bajo" },
        ];
        //nivelsocioeconomico.addAllNivelSocioeconomico(arrayNivelSocioeconomico);
        var arrayNivelEducativo = [
            { descripcion: "Primaria" },
            { descripcion: "Secundaria" },
            { descripcion: "Tecnico" },
            { descripcion: "Universitario" },
        ];
        //niveleducativo.addAllNivelEducativo(arrayNivelEducativo);
        var arrayPatalogia = [
            { descripcion: "Auencia dental" },
            { descripcion: "Caries" },
            { descripcion: "Patología atm" },
            { descripcion: "No posee" }
        ];
        //patologiaService.addAllPatologia(arrayPatalogia);
        var arrayPatalogia = [
            { descripcion: "Localizada" },
            { descripcion: "General" },
            { descripcion: "No posee" }
        ];
        //periodontitisService.addAllPeriodontitis(arrayPatalogia)
    }
    MensajeriaPage.prototype.enviarMensaje = function () {
        var mensaje = {
            contenido: this.msj,
            date: new Date()
        };
        this.messageService.addMensaje(mensaje);
    };
    /*enviarMensaje(){
      this.mensajes.push(this.mensaje);
    }*/
    MensajeriaPage.prototype.abrirFormulario = function () {
        var _this = this;
        var params = { disabled: false, paciente: null };
        this.storage.set('disabled', params).then(function () {
            _this.navController.navigateForward('basico');
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
    MensajeriaPage.prototype.ngOnInit = function () {
        this._loadMensaje();
    };
    MensajeriaPage.prototype._loadMensaje = function () {
        this.mensajeList$ = this.messageService.getMensajeList().valueChanges(); //un obsevable
    };
    var _a, _b;
    MensajeriaPage = tslib_1.__decorate([
        Component({
            selector: 'app-mensajeria',
            templateUrl: './mensajeria.page.html',
            styleUrls: ['./mensajeria.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            NavController,
            AngularFireAuth,
            Storage, typeof (_a = typeof UserService !== "undefined" && UserService) === "function" ? _a : Object, typeof (_b = typeof MessageService !== "undefined" && MessageService) === "function" ? _b : Object])
    ], MensajeriaPage);
    return MensajeriaPage;
}());
export { MensajeriaPage };
//# sourceMappingURL=mensajeria.page.js.map