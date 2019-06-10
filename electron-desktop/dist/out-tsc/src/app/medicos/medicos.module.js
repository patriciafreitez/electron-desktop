import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MedicosPage } from './medicos.page';
var routes = [
    {
        path: '',
        component: MedicosPage
    }
];
var MedicosPageModule = /** @class */ (function () {
    function MedicosPageModule() {
    }
    MedicosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ReactiveFormsModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MedicosPage]
        })
    ], MedicosPageModule);
    return MedicosPageModule;
}());
export { MedicosPageModule };
//# sourceMappingURL=medicos.module.js.map