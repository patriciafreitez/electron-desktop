import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
var UserService = /** @class */ (function () {
    function UserService(db) {
        this.db = db;
        this.userRootListRef = this.db.list('user-root-list');
    }
    UserService.prototype.addUserRoot = function (email) {
        return this.userRootListRef.push(this.getUser(email));
    };
    UserService.prototype.findByEmail = function (email) {
        return this.db.list('/user-root-list', function (ref) { return ref.orderByChild('email').equalTo(email); });
    };
    UserService.prototype.getUser = function (email) {
        return {
            email: email
        };
    };
    UserService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map