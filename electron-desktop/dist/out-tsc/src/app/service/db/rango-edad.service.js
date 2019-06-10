import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
var RangoEdadService = /** @class */ (function () {
    function RangoEdadService(db) {
        this.db = db;
        this.rangoEdadListRef = this.db.list('rango-edad-list');
    }
    RangoEdadService.prototype.getRangoEdad = function () {
        return this.rangoEdadListRef;
    };
    RangoEdadService.prototype.filterByDescripcion = function (descripcion) {
        return this.db.list('/rango-edad-list', function (ref) { return ref.orderByChild('descripcion').equalTo(descripcion); });
    };
    RangoEdadService.prototype.addRangoEdad = function (rangoEdad) {
        return this.rangoEdadListRef.push(rangoEdad);
    };
    RangoEdadService.prototype.addAllRangoEdad = function (rangoEdad) {
        var _this = this;
        rangoEdad.forEach(function (element) {
            _this.addRangoEdad(element);
        });
    };
    RangoEdadService.prototype.editRangoEdad = function (rangoEdad) {
        return this.rangoEdadListRef.update(rangoEdad.key, rangoEdad);
    };
    RangoEdadService.prototype.removeRangoEdad = function (rangoEdad) {
        return this.rangoEdadListRef.remove(rangoEdad.key);
    };
    RangoEdadService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase])
    ], RangoEdadService);
    return RangoEdadService;
}());
export { RangoEdadService };
//# sourceMappingURL=rango-edad.service.js.map