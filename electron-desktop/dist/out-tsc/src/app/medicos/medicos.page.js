import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AntecedenteMedicoService } from '../service/db/antecedente-medico.service';
var MedicosPage = /** @class */ (function () {
    function MedicosPage(route, formBuilder, //libreria a importar
    navController, storage, angularFireAuth, antecedenteMedicoService) {
        this.route = route;
        this.formBuilder = formBuilder;
        this.navController = navController;
        this.storage = storage;
        this.angularFireAuth = angularFireAuth;
        this.antecedenteMedicoService = antecedenteMedicoService;
        this.formSubmit = false;
        this.loadParams();
        this.construirValidaciones();
        this.verPaciente();
    }
    MedicosPage.prototype.verPaciente = function () {
        var _this = this;
        this.storage.get('disabled').then(function (data) {
            _this.soloVista = data.disabled;
            if (data.paciente !== null) {
                var paciente = data.paciente;
                _this.formMedicos.get('hipertension_arterial').setValue(paciente.hipertension_arterial);
                _this.formMedicos.get('diabetes_mellitus').setValue(paciente.diabetes_mellitus);
                _this.formMedicos.get('diabetes_gestacional').setValue(paciente.diabetes_gestacional);
                _this.formMedicos.get('enfermedades_tiroidales').setValue(paciente.enfermedades_tiroidales);
                _this.formMedicos.get('enfermedades_cardiovasculares').setValue(paciente.enfermedades_cardiovasculares);
                _this.formMedicos.get('drogadiccion').setValue(paciente.drogadiccion);
                _this.formMedicos.get('embarazo').setValue(paciente.embarazo);
                _this.formMedicos.get('desnutricion').setValue(paciente.desnutricion);
                _this.formMedicos.get('sano').setValue(paciente.sano);
                _this.formMedicos.get('vih').setValue(paciente.vih);
                _this.formMedicos.get('enfermedades_gastrointestinales').setValue(paciente.enfermedades_gastrointestinales);
                _this.formMedicos.get('alergias').setValue(paciente.alergias);
                _this.formMedicos.get('sicologicos').setValue(paciente.sicologicos);
                _this.formMedicos.get('obesidad').setValue(paciente.obesidad);
                _this.formMedicos.get('fumador').setValue(paciente.fumador);
                _this.formMedicos.get('cigarros_dia').setValue(paciente.cigarros_dia);
                _this.formMedicos.get('observaciones').setValue(paciente.observaciones);
            }
        });
    };
    MedicosPage.prototype.loadParams = function () {
        var _this = this;
        this.storage.get('form').then(function (form) {
            if (form.formMedicos !== undefined) {
                var formMedicos = form.formMedicos;
                _this.formMedicos.get('hipertension_arterial').setValue(formMedicos.hipertension_arterial);
                _this.formMedicos.get('diabetes_mellitus').setValue(formMedicos.diabetes_mellitus);
                _this.formMedicos.get('diabetes_gestacional').setValue(formMedicos.diabetes_gestacional);
                _this.formMedicos.get('enfermedades_tiroidales').setValue(formMedicos.enfermedades_tiroidales);
                _this.formMedicos.get('enfermedades_cardiovasculares').setValue(formMedicos.enfermedades_cardiovasculares);
                _this.formMedicos.get('drogadiccion').setValue(formMedicos.drogadiccion);
                _this.formMedicos.get('embarazo').setValue(formMedicos.embarazo);
                _this.formMedicos.get('desnutricion').setValue(formMedicos.desnutricion);
                _this.formMedicos.get('sano').setValue(formMedicos.sano);
                _this.formMedicos.get('vih').setValue(formMedicos.vih);
                _this.formMedicos.get('enfermedades_gastrointestinales').setValue(formMedicos.enfermedades_gastrointestinales);
                _this.formMedicos.get('alergias').setValue(formMedicos.alergias);
                _this.formMedicos.get('sicologicos').setValue(formMedicos.sicologicos);
                _this.formMedicos.get('obesidad').setValue(formMedicos.obesidad);
                _this.formMedicos.get('fumador').setValue(formMedicos.fumador);
                _this.formMedicos.get('cigarros_dia').setValue(formMedicos.cigarros_dia);
                _this.formMedicos.get('observaciones').setValue(formMedicos.observaciones);
            }
        });
    };
    MedicosPage.prototype.construirValidaciones = function () {
        this.formMedicos = this.formBuilder.group({
            hipertension_arterial: [false],
            diabetes_mellitus: [false],
            diabetes_gestacional: [false],
            enfermedades_tiroidales: [false],
            enfermedades_cardiovasculares: [false],
            drogadiccion: [false],
            embarazo: [false],
            desnutricion: [false],
            sano: [false],
            vih: [false],
            enfermedades_gastrointestinales: [false],
            alergias: [false],
            sicologicos: [false],
            obesidad: [false],
            fumador: [false],
            cigarros_dia: [''],
            observaciones: ['']
        });
    };
    MedicosPage.prototype.validateFormMedicos = function () {
        var _this = this;
        if (this.formMedicos.valid) {
            this.guardarForm().then(function () {
                _this.navController.navigateForward('diagnostico');
            });
        }
    };
    MedicosPage.prototype.IrAtras = function () {
        var _this = this;
        this.guardarForm().then(function () {
            _this.navController.navigateBack('basico');
        });
    };
    MedicosPage.prototype.guardarForm = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("form").then(function (form) {
                var value = _this.formMedicos.value;
                form.formMedicos = {
                    hipertension_arterial: value.hipertension_arterial === undefined ? false : value.hipertension_arterial,
                    diabetes_mellitus: value.diabetes_mellitus === undefined ? false : value.diabetes_mellitus,
                    diabetes_gestacional: value.diabetes_gestacional === undefined ? false : value.diabetes_gestacional,
                    enfermedades_tiroidales: value.enfermedades_tiroidales === undefined ? false : value.enfermedades_tiroidales,
                    enfermedades_cardiovasculares: value.enfermedades_cardiovasculares === undefined ? false : value.enfermedades_cardiovasculares,
                    drogadiccion: value.drogadiccion === undefined ? false : value.drogadiccion,
                    embarazo: value.embarazo === undefined ? false : value.embarazo,
                    desnutricion: value.desnutricion === undefined ? false : value.desnutricion,
                    sano: value.sano === undefined ? false : value.sano,
                    vih: value.vih === undefined ? false : value.vih,
                    enfermedades_gastrointestinales: value.enfermedades_gastrointestinales === undefined ? false : value.enfermedades_gastrointestinales,
                    alergias: value.alergias === undefined ? false : value.alergias,
                    sicologicos: value.sicologicos === undefined ? false : value.sicologicos,
                    obesidad: value.obesidad === undefined ? false : value.obesidad,
                    fumador: value.fumador === undefined ? false : value.fumador,
                    cigarros_dia: value.cigarros_dia === undefined ? false : value.cigarros_dia,
                    observaciones: value.observaciones === undefined ? false : value.observaciones
                };
                _this.storage.set('form', form).then(function (data) {
                    resolve(data);
                }); // aqui guarda los datos asignados   
            });
        });
    };
    MedicosPage.prototype.ngOnInit = function () {
        this._loadAntecenteMedico();
    };
    MedicosPage.prototype._loadAntecenteMedico = function () {
        this.AntecendetesMedicosList$ = this.antecedenteMedicoService.getAntecedenteMedicoList().valueChanges();
    };
    MedicosPage = tslib_1.__decorate([
        Component({
            selector: 'app-medicos',
            templateUrl: './medicos.page.html',
            styleUrls: ['./medicos.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            FormBuilder,
            NavController,
            Storage,
            AngularFireAuth,
            AntecedenteMedicoService])
    ], MedicosPage);
    return MedicosPage;
}());
export { MedicosPage };
//# sourceMappingURL=medicos.page.js.map