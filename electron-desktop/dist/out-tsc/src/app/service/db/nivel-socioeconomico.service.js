import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
var NivelSocioeconomicoService = /** @class */ (function () {
    function NivelSocioeconomicoService(db) {
        this.db = db;
        this.nivelSocioeconomicoListRef = this.db.list('nivel-socioeconomico-list');
    }
    NivelSocioeconomicoService.prototype.getNivelSocioeconomicoList = function () {
        return this.nivelSocioeconomicoListRef;
    };
    NivelSocioeconomicoService.prototype.filterByDescripcion = function (descripcion) {
        return this.db.list('/nivel-socioeconomico-list', function (ref) { return ref.orderByChild('descripcion').equalTo(descripcion); });
    };
    NivelSocioeconomicoService.prototype.addNivelSocioeconomico = function (nivelSocioeconomico) {
        return this.nivelSocioeconomicoListRef.push(nivelSocioeconomico);
    };
    NivelSocioeconomicoService.prototype.addAllNivelSocioeconomico = function (nivelSocioeconomico) {
        var _this = this;
        nivelSocioeconomico.forEach(function (element) {
            _this.addNivelSocioeconomico(element);
        });
    };
    NivelSocioeconomicoService.prototype.editNivelSocioeconomico = function (nivelSocioeconomico) {
        return this.nivelSocioeconomicoListRef.update(nivelSocioeconomico.key, nivelSocioeconomico);
    };
    NivelSocioeconomicoService.prototype.removeNivelSocioeconomico = function (nivelSocioeconomico) {
        return this.nivelSocioeconomicoListRef.remove(nivelSocioeconomico.key);
    };
    NivelSocioeconomicoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase])
    ], NivelSocioeconomicoService);
    return NivelSocioeconomicoService;
}());
export { NivelSocioeconomicoService };
//# sourceMappingURL=nivel-socioeconomico.service.js.map