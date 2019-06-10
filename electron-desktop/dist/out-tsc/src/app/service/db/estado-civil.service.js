import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
var EstadoCivilService = /** @class */ (function () {
    function EstadoCivilService(db) {
        this.db = db;
        this.estadoCivilListRef = this.db.list('estado-civil-list');
    }
    EstadoCivilService.prototype.getEstadoCivilList = function () {
        return this.estadoCivilListRef;
    };
    EstadoCivilService.prototype.filterByDescripcion = function (descripcion) {
        return this.db.list('/estado-civil-list', function (ref) { return ref.orderByChild('descripcion').equalTo(descripcion); });
    };
    EstadoCivilService.prototype.addEstadoCivil = function (estadoCivil) {
        return this.estadoCivilListRef.push(estadoCivil);
    };
    EstadoCivilService.prototype.addAllEstadoCivil = function (estadoCivil) {
        var _this = this;
        estadoCivil.forEach(function (element) {
            _this.addEstadoCivil(element);
        });
    };
    EstadoCivilService.prototype.editEstadoCivil = function (estadoCivil) {
        return this.estadoCivilListRef.update(estadoCivil.key, estadoCivil);
    };
    EstadoCivilService.prototype.removeEstadoCivil = function (estadoCivil) {
        return this.estadoCivilListRef.remove(estadoCivil.key);
    };
    EstadoCivilService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase])
    ], EstadoCivilService);
    return EstadoCivilService;
}());
export { EstadoCivilService };
//# sourceMappingURL=estado-civil.service.js.map