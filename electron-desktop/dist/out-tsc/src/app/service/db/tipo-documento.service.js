import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
var TipoDocumentoService = /** @class */ (function () {
    function TipoDocumentoService(db) {
        this.db = db;
        this.tipoDocumentoListRef = this.db.list('tipo-documento-list');
    }
    TipoDocumentoService.prototype.getTipoDocumentoList = function () {
        return this.tipoDocumentoListRef;
    };
    TipoDocumentoService.prototype.filterByDescripcion = function (descripcion) {
        return this.db.list('/tipo-documento-list', function (ref) { return ref.orderByChild('descripcion').equalTo(descripcion); });
    };
    TipoDocumentoService.prototype.addTipoDocumento = function (tipoDocumento) {
        return this.tipoDocumentoListRef.push(tipoDocumento);
    };
    TipoDocumentoService.prototype.addAllTipoDocumento = function (tipoDocumento) {
        var _this = this;
        tipoDocumento.forEach(function (element) {
            _this.addTipoDocumento(element);
        });
    };
    TipoDocumentoService.prototype.editTipoDocumento = function (tipoDocumento) {
        return this.tipoDocumentoListRef.update(tipoDocumento.key, tipoDocumento);
    };
    TipoDocumentoService.prototype.removeTipoDocumento = function (tipoDocumento) {
        return this.tipoDocumentoListRef.remove(tipoDocumento.key);
    };
    TipoDocumentoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase])
    ], TipoDocumentoService);
    return TipoDocumentoService;
}());
export { TipoDocumentoService };
//# sourceMappingURL=tipo-documento.service.js.map