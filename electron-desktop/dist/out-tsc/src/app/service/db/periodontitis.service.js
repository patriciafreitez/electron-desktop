import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
var PeriodontitisService = /** @class */ (function () {
    function PeriodontitisService(db) {
        this.db = db;
        this.periodontitisListRef = this.db.list('periodontitis-list');
    }
    PeriodontitisService.prototype.getPeriodontitis = function () {
        return this.periodontitisListRef;
    };
    PeriodontitisService.prototype.filterByDescripcion = function (descripcion) {
        return this.db.list('/periodontitis-list', function (ref) { return ref.orderByChild('descripcion').equalTo(descripcion); });
    };
    PeriodontitisService.prototype.addPatologia = function (periodontitis) {
        return this.periodontitisListRef.push(periodontitis);
    };
    PeriodontitisService.prototype.addAllPeriodontitis = function (periodontitis) {
        var _this = this;
        periodontitis.forEach(function (element) {
            _this.addPatologia(element);
        });
    };
    PeriodontitisService.prototype.editPeriodontitis = function (periodontitis) {
        return this.periodontitisListRef.update(periodontitis.key, periodontitis);
    };
    PeriodontitisService.prototype.removePeriodontitis = function (periodontitis) {
        return this.periodontitisListRef.remove(periodontitis.key);
    };
    PeriodontitisService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase])
    ], PeriodontitisService);
    return PeriodontitisService;
}());
export { PeriodontitisService };
//# sourceMappingURL=periodontitis.service.js.map