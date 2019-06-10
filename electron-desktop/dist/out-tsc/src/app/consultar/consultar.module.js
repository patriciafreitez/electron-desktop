import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ConsultarPage } from './consultar.page';
var routes = [
    {
        path: '',
        component: ConsultarPage
    }
];
var ConsultarPageModule = /** @class */ (function () {
    function ConsultarPageModule() {
    }
    ConsultarPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ConsultarPage]
        })
    ], ConsultarPageModule);
    return ConsultarPageModule;
}());
export { ConsultarPageModule };
//# sourceMappingURL=consultar.module.js.map