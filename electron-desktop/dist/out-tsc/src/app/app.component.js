import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, navController, angularFireAuth) {
        this.platform = platform;
        this.navController = navController;
        this.angularFireAuth = angularFireAuth;
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.angularFireAuth.auth.onAuthStateChanged(function (user) {
                if (user) {
                    _this.navController.navigateRoot(['mensajeria']);
                }
                else {
                    _this.navController.navigateRoot(['']);
                }
            });
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            NavController,
            AngularFireAuth])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map