import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, IonSelect } from '@ionic/angular';
import { PacienteService } from '../service/db/paciente.service';
import { PeriodontitisService } from '../service/db/periodontitis.service';
var DiagnosticoPage = /** @class */ (function () {
    function DiagnosticoPage(formBuilder, //libreria a importar
    navController, storage, pacienteService, periodontitisService) {
        this.formBuilder = formBuilder;
        this.navController = navController;
        this.storage = storage;
        this.pacienteService = pacienteService;
        this.periodontitisService = periodontitisService;
        this.formSubmit = false;
        this.interfaceOptions = { cssClass: 'custom-select' };
        this.periodontitisist$ = [];
        this.paciente = null;
        this.loadParams();
        this.construirValidaciones();
        this.verPaciente();
    }
    DiagnosticoPage.prototype.verPaciente = function () {
        var _this = this;
        this.storage.get('disabled').then(function (data) {
            _this.soloVista = data.disabled;
            if (data.paciente !== null) {
                var paciente = data.paciente;
                _this.formDiagnostico.get('cariados').setValue(paciente.cariados);
                _this.formDiagnostico.get('opturados').setValue(paciente.opturados);
                _this.formDiagnostico.get('perdidos').setValue(paciente.perdidos);
                _this.formDiagnostico.get('ausencia_dental').setValue(paciente.ausencia_dental);
                _this.formDiagnostico.get('caries').setValue(paciente.caries);
                _this.formDiagnostico.get('patologia').setValue(paciente.patologia);
                _this.formDiagnostico.get('gingivitis').setValue(paciente.gingivitis);
                _this.formDiagnostico.get('mal_posiciones').setValue(paciente.mal_posiciones);
                _this.formDiagnostico.get('onicofagia').setValue(paciente.onicofagia);
                _this.formDiagnostico.get('succion_labial').setValue(paciente.succion_labial);
                _this.formDiagnostico.get('succion_digital').setValue(paciente.succion_digital);
                _this.formDiagnostico.get('interposicion_lingual').setValue(paciente.interposicion_lingual);
            }
        });
    };
    DiagnosticoPage.prototype.loadParams = function () {
        var _this = this;
        this.storage.get('form').then(function (form) {
            if (form.formDiagnostico !== undefined) {
                var formDiagnostico = form.formDiagnostico;
                _this.formDiagnostico.get('cariados').setValue(formDiagnostico.cariados);
                _this.formDiagnostico.get('opturados').setValue(formDiagnostico.opturados);
                _this.formDiagnostico.get('perdidos').setValue(formDiagnostico.perdidos);
                _this.formDiagnostico.get('periodontitis').setValue(formDiagnostico.periodontitis);
                _this.formDiagnostico.get('patologia').setValue(formDiagnostico.patologia);
                _this.formDiagnostico.get('ausencia_dental').setValue(formDiagnostico.ausencia_dental);
                _this.formDiagnostico.get('caries').setValue(formDiagnostico.caries);
                _this.formDiagnostico.get('gingivitis').setValue(formDiagnostico.gingivitis);
                _this.formDiagnostico.get('mal_posiciones').setValue(formDiagnostico.mal_posiciones);
                _this.formDiagnostico.get('onicofagia').setValue(formDiagnostico.onicofagia);
                _this.formDiagnostico.get('succion_labial').setValue(formDiagnostico.succion_labial);
                _this.formDiagnostico.get('succion_digital').setValue(formDiagnostico.succion_digital);
                _this.formDiagnostico.get('interposicion_lingual').setValue(formDiagnostico.interposicion_lingual);
            }
        });
    };
    DiagnosticoPage.prototype.construirValidaciones = function () {
        this.formDiagnostico = this.formBuilder.group({
            cariados: ['', Validators.compose([Validators.required])],
            opturados: ['', Validators.compose([Validators.required])],
            perdidos: ['', Validators.compose([Validators.required])],
            periodontitis: [''],
            ausencia_dental: [false],
            caries: [false],
            patologia: [false],
            gingivitis: [false],
            mal_posiciones: ['', Validators.compose([Validators.required])],
            onicofagia: [false],
            succion_labial: [false],
            succion_digital: [false],
            interposicion_lingual: [false]
        });
    };
    DiagnosticoPage.prototype.IrAtras = function () {
        var _this = this;
        this.guardarForm().then(function () {
            _this.navController.navigateBack('medicos');
        });
    };
    DiagnosticoPage.prototype.guardarForm = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("form").then(function (form) {
                var value = _this.formDiagnostico.value;
                form.formDiagnostico = {
                    cariados: value.cariados,
                    opturados: value.opturados,
                    perdidos: value.perdidos,
                    periodontitis: value.periodontitis === undefined ? false : value.periodontitis,
                    patologia: value.patologia === undefined ? false : value.patologia,
                    ausencia_dental: value.ausencia_dental === undefined ? false : value.ausencia_dental,
                    caries: value.caries === undefined ? false : value.caries,
                    gingivitis: value.gingivitis === undefined ? false : value.gingivitis,
                    mal_posiciones: value.mal_posiciones,
                    onicofagia: value.onicofagia === undefined ? false : value.onicofagia,
                    succion_labial: value.succion_labial === undefined ? false : value.succion_labial,
                    succion_digital: value.succion_digital === undefined ? false : value.succion_digital,
                    interposicion_lingual: value.interposicion_lingual === undefined ? false : value.interposicion_lingual
                };
                _this.storage.set('form', form).then(function (data) {
                    resolve(data);
                }); // aqui guarda los datos asignados   
            });
        });
    };
    DiagnosticoPage.prototype.registrar = function () {
        var _this = this;
        if (this.formDiagnostico.valid) {
            this.guardarForm().then(function (data) {
                var user = {};
                for (var key in data) {
                    for (var key2 in data[key]) {
                        user[key2] = data[key][key2];
                    }
                }
                _this.pacienteService.addPaciente(user);
                _this.storage.remove('form');
                _this.navController.navigateBack('mensajeria');
            });
        }
        else {
            this.formSubmit = true; // controla que el mensaje salga cuando intenta cambiar de pantalla
        }
    };
    DiagnosticoPage.prototype.modificar = function () {
        var _this = this;
        if (this.formDiagnostico.valid) {
            this.guardarForm().then(function (data) {
                var user = {};
                for (var key in data) {
                    for (var key2 in data[key]) {
                        user[key2] = data[key][key2];
                    }
                }
                _this.pacienteService.editPaciente(user);
                _this.storage.remove('form');
                _this.navController.navigateBack('mensajeria');
            });
        }
        else {
            this.formSubmit = true; // controla que el mensaje salga cuando intenta cambiar de pantalla
        }
    };
    DiagnosticoPage.prototype.ngOnInit = function () {
        this._loadPeriodontitis();
    };
    DiagnosticoPage.prototype._loadPeriodontitis = function () {
        var _this = this;
        this.periodontitisService.getPeriodontitis().valueChanges().subscribe(function (data) {
            _this.periodontitisist$ = data;
            if (_this.paciente !== null) {
                _this.selectPeriodontitis.selectedText = _this.paciente.periodontitis;
                _this.formDiagnostico.get('periodontitis').setValue(_this.paciente.periodontitis);
            }
        });
    };
    tslib_1.__decorate([
        ViewChild('selectPeriodontitis'),
        tslib_1.__metadata("design:type", IonSelect)
    ], DiagnosticoPage.prototype, "selectPeriodontitis", void 0);
    DiagnosticoPage = tslib_1.__decorate([
        Component({
            selector: 'app-diagnostico',
            templateUrl: './diagnostico.page.html',
            styleUrls: ['./diagnostico.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            NavController,
            Storage,
            PacienteService,
            PeriodontitisService])
    ], DiagnosticoPage);
    return DiagnosticoPage;
}());
export { DiagnosticoPage };
//# sourceMappingURL=diagnostico.page.js.map