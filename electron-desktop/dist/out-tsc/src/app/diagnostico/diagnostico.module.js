import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DiagnosticoPage } from './diagnostico.page';
var routes = [
    {
        path: '',
        component: DiagnosticoPage
    }
];
var DiagnosticoPageModule = /** @class */ (function () {
    function DiagnosticoPageModule() {
    }
    DiagnosticoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [DiagnosticoPage]
        })
    ], DiagnosticoPageModule);
    return DiagnosticoPageModule;
}());
export { DiagnosticoPageModule };
//# sourceMappingURL=diagnostico.module.js.map