import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
var routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'basico', loadChildren: './home/home.module#HomePageModule' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'medicos', loadChildren: './medicos/medicos.module#MedicosPageModule' },
    { path: 'diagnostico', loadChildren: './diagnostico/diagnostico.module#DiagnosticoPageModule' },
    { path: 'consultar', loadChildren: './consultar/consultar.module#ConsultarPageModule' },
    { path: 'mensajeria', loadChildren: './mensajeria/mensajeria.module#MensajeriaPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map