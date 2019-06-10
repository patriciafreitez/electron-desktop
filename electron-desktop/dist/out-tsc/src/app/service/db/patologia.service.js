import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
var PatologiaService = /** @class */ (function () {
    function PatologiaService(db) {
        this.db = db;
        this.patologiaListRef = this.db.list('patologia-list');
    }
    PatologiaService.prototype.getPatologia = function () {
        return this.patologiaListRef;
    };
    PatologiaService.prototype.filterByDescripcion = function (descripcion) {
        return this.db.list('/patologia-list', function (ref) { return ref.orderByChild('descripcion').equalTo(descripcion); });
    };
    PatologiaService.prototype.addPatologia = function (patologia) {
        return this.patologiaListRef.push(patologia);
    };
    PatologiaService.prototype.addAllPatologia = function (patologia) {
        var _this = this;
        patologia.forEach(function (element) {
            _this.addPatologia(element);
        });
    };
    PatologiaService.prototype.editPatologia = function (patologia) {
        return this.patologiaListRef.update(patologia.key, patologia);
    };
    PatologiaService.prototype.removePatologia = function (patologia) {
        return this.patologiaListRef.remove(patologia.key);
    };
    PatologiaService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase])
    ], PatologiaService);
    return PatologiaService;
}());
export { PatologiaService };
//# sourceMappingURL=patologia.service.js.map