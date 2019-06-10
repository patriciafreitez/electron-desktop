import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
var NivelEducativoService = /** @class */ (function () {
    function NivelEducativoService(db) {
        this.db = db;
        this.nivelEducativoListRef = this.db.list('nivel-educativo-list');
    }
    NivelEducativoService.prototype.getNivelEducativoList = function () {
        return this.nivelEducativoListRef;
    };
    NivelEducativoService.prototype.filterByDescripcion = function (descripcion) {
        return this.db.list('/nivel-educativo-list', function (ref) { return ref.orderByChild('descripcion').equalTo(descripcion); });
    };
    NivelEducativoService.prototype.addNivelEducativo = function (nivelEducativo) {
        return this.nivelEducativoListRef.push(nivelEducativo);
    };
    NivelEducativoService.prototype.addAllNivelEducativo = function (nivelEducativo) {
        var _this = this;
        nivelEducativo.forEach(function (element) {
            _this.addNivelEducativo(element);
        });
    };
    NivelEducativoService.prototype.editNivelEducativo = function (nivelEducativo) {
        return this.nivelEducativoListRef.update(nivelEducativo.key, nivelEducativo);
    };
    NivelEducativoService.prototype.removeNivelEducativo = function (nivelEducativo) {
        return this.nivelEducativoListRef.remove(nivelEducativo.key);
    };
    NivelEducativoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase])
    ], NivelEducativoService);
    return NivelEducativoService;
}());
export { NivelEducativoService };
//# sourceMappingURL=nivel-educativo.service.js.map