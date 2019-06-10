import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { MessageService } from '../service/message.service';
import { FirebaseAuth } from '../enum/firebase-auth.enum';
import { Storage } from '@ionic/storage';
var LoginPage = /** @class */ (function () {
    function LoginPage(navController, angularFireAuth, message, storage) {
        this.navController = navController;
        this.angularFireAuth = angularFireAuth;
        this.message = message;
        this.storage = storage;
        this.email = '';
        this.pass = '';
    }
    LoginPage.prototype.ngOnInit = function () { };
    LoginPage.prototype.register = function () {
        var _this = this;
        this.angularFireAuth.auth.createUserWithEmailAndPassword(this.email, this.pass).then(function (res) {
            _this.navController.navigateRoot(['basico']);
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.angularFireAuth.auth.signInWithEmailAndPassword(this.email, this.pass).then(function (res) {
            _this.storage.set('email', _this.email);
            _this.navController.navigateRoot(['mensajeria']);
        }).catch(function (error) {
            switch (error.code) {
                case FirebaseAuth.INVALID_EMAIL:
                    _this.message.alertOk('Información', '', 'Ingrese un email valido.');
                    break;
                case FirebaseAuth.USER_NOT_FOUND:
                    _this.message.alertOk('Información', '', 'Usuario no registrado.');
                    break;
                case FirebaseAuth.WRONG_PASSWORD:
                    _this.message.alertOk('Información', '', 'Contraseña incorrecta.');
                    break;
            }
        });
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AngularFireAuth,
            MessageService,
            Storage])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map