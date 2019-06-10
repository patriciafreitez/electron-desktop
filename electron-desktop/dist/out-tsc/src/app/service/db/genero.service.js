import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
var GeneroService = /** @class */ (function () {
    function GeneroService(db) {
        this.db = db;
        this.generoListRef = this.db.list('genero-list');
    }
    GeneroService.prototype.getGeneroList = function () {
        return this.generoListRef;
    };
    GeneroService.prototype.filterByDescripcion = function (descripcion) {
        return this.db.list('/genero-list', function (ref) { return ref.orderByChild('descripcion').equalTo(descripcion); });
    };
    GeneroService.prototype.addGenero = function (genero) {
        return this.generoListRef.push(genero);
    };
    GeneroService.prototype.addAllGenero = function (genero) {
        var _this = this;
        genero.forEach(function (element) {
            _this.addGenero(element);
        });
    };
    GeneroService.prototype.editGenero = function (genero) {
        return this.generoListRef.update(genero.key, genero);
    };
    GeneroService.prototype.removeGenero = function (genero) {
        return this.generoListRef.remove(genero.key);
    };
    GeneroService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase])
    ], GeneroService);
    return GeneroService;
}());
export { GeneroService };
//# sourceMappingURL=genero.service.js.map