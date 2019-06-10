import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
var EpsService = /** @class */ (function () {
    function EpsService(db) {
        this.db = db;
        this.epsListRef = this.db.list('eps-list');
    }
    EpsService.prototype.getEpsList = function () {
        return this.epsListRef;
    };
    EpsService.prototype.filterByDescripcion = function (descripcion) {
        return this.db.list('/eps-list', function (ref) { return ref.orderByChild('descripcion').equalTo(descripcion); });
    };
    EpsService.prototype.addEps = function (eps) {
        return this.epsListRef.push(eps);
    };
    EpsService.prototype.addAllEps = function (eps) {
        var _this = this;
        eps.forEach(function (element) {
            _this.addEps(element);
        });
    };
    EpsService.prototype.editEps = function (eps) {
        return this.epsListRef.update(eps.key, eps);
    };
    EpsService.prototype.removeEps = function (eps) {
        return this.epsListRef.remove(eps.key);
    };
    EpsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase])
    ], EpsService);
    return EpsService;
}());
export { EpsService };
//# sourceMappingURL=eps.service.js.map