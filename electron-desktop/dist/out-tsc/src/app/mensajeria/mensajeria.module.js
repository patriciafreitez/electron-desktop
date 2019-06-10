import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MensajeriaPage } from './mensajeria.page';
var routes = [
    {
        path: '',
        component: MensajeriaPage
    }
];
var MensajeriaPageModule = /** @class */ (function () {
    function MensajeriaPageModule() {
    }
    MensajeriaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ReactiveFormsModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MensajeriaPage]
        })
    ], MensajeriaPageModule);
    return MensajeriaPageModule;
}());
export { MensajeriaPageModule };
//# sourceMappingURL=mensajeria.module.js.map