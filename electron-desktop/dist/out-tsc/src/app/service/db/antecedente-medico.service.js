import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
var AntecedenteMedicoService = /** @class */ (function () {
    function AntecedenteMedicoService(db) {
        this.db = db;
        this.antecedenteMedicoListRef = this.db.list('antecendete-medico-list');
    }
    AntecedenteMedicoService.prototype.getAntecedenteMedicoList = function () {
        return this.antecedenteMedicoListRef;
    };
    AntecedenteMedicoService.prototype.filterByDescripcion = function (descripcion) {
        return this.db.list('/antecendete-medico-list', function (ref) { return ref.orderByChild('descripcion').equalTo(descripcion); });
    };
    AntecedenteMedicoService.prototype.addAntecedenteMedico = function (antecedenteMedico) {
        return this.antecedenteMedicoListRef.push(antecedenteMedico);
    };
    AntecedenteMedicoService.prototype.addAllAntecedenteMedico = function (antecedenteMedico) {
        var _this = this;
        antecedenteMedico.forEach(function (element) {
            _this.addAntecedenteMedico(element);
        });
    };
    AntecedenteMedicoService.prototype.editAntecedenteMedico = function (antecedenteMedico) {
        return this.antecedenteMedicoListRef.update(antecedenteMedico.key, antecedenteMedico);
    };
    AntecedenteMedicoService.prototype.removeAntecedenteMedico = function (antecedenteMedico) {
        return this.antecedenteMedicoListRef.remove(antecedenteMedico.key);
    };
    AntecedenteMedicoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase])
    ], AntecedenteMedicoService);
    return AntecedenteMedicoService;
}());
export { AntecedenteMedicoService };
//# sourceMappingURL=antecedente-medico.service.js.map