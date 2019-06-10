import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavController, IonSelect } from '@ionic/angular';
import { UserService } from '../service/db/user.service';
import { Storage } from '@ionic/storage'; //importar manual
import { EpsService } from '../service/db/eps.service';
import { TipoDocumentoService } from '../service/db/tipo-documento.service';
import { GeneroService } from '../service/db/genero.service';
import { EstadoCivilService } from '../service/db/estado-civil.service';
import { NivelSocioeconomicoService } from '../service/db/nivel-socioeconomico.service';
import { NivelEducativoService } from '../service/db/nivel-educativo.service';
import { FormBuilder, Validators } from '@angular/forms';
var HomePage = /** @class */ (function () {
    function HomePage(userService, navController, storage, //importar manual
    formBuilder, epsService, tipoDocumentoService, generoService, estadoCivilService, nivelSocioeconomicoService, nivelEducativoService) {
        this.userService = userService;
        this.navController = navController;
        this.storage = storage;
        this.formBuilder = formBuilder;
        this.epsService = epsService;
        this.tipoDocumentoService = tipoDocumentoService;
        this.generoService = generoService;
        this.estadoCivilService = estadoCivilService;
        this.nivelSocioeconomicoService = nivelSocioeconomicoService;
        this.nivelEducativoService = nivelEducativoService;
        this.formularioData = {};
        this.formSubmit = false;
        this.interfaceOptions = { cssClass: 'custom-select' };
        this.paciente = null;
        this.epsList$ = [];
        this.tipoDocumentoList$ = [];
        this.generoList$ = [];
        this.estadoCivilList$ = [];
        this.nivelSocioeconomicoList$ = [];
        this.nivelEducativoList$ = [];
        this.construirValidaciones();
        this.verPaciente();
    }
    HomePage.prototype.verPaciente = function () {
        var _this = this;
        this.storage.get('disabled').then(function (data) {
            _this.soloVista = data.disabled;
            _this.paciente = data.paciente;
            if (_this.paciente !== null) {
                _this.formPersonales.get('nombre').setValue(_this.paciente.nombre);
                _this.formPersonales.get('apellido').setValue(_this.paciente.apellido);
                _this.formPersonales.get('numero_identidad').setValue(_this.paciente.numero_identidad);
                _this.formPersonales.get('lugar_nacimiento').setValue(_this.paciente.lugar_nacimiento);
                _this.formPersonales.get('historia_clinica').setValue(_this.paciente.historia_clinica);
                _this.formPersonales.get('fecha_nacimiento').setValue(_this.paciente.fecha_nacimiento);
                _this.formPersonales.get('fecha').setValue(_this.paciente.fecha);
                _this.formPersonales.get('ocupacion').setValue(_this.paciente.ocupacion);
                _this.formPersonales.get('telefono_celular').setValue(_this.paciente.telefono_celular);
                _this.formPersonales.get('telefono_fijo').setValue(_this.paciente.telefono_fijo);
                _this.formPersonales.get('correo').setValue(_this.paciente.correo);
                _this.formPersonales.get('direccion').setValue(_this.paciente.direccion);
                _this.formPersonales.get('responsable').setValue(_this.paciente.responsable);
                _this.formPersonales.get('telefono_responsable').setValue(_this.paciente.telefono_responsable);
            }
        });
    };
    HomePage.prototype.construirValidaciones = function () {
        this.formPersonales = this.formBuilder.group({
            eps: ['', Validators.compose([Validators.required])],
            nombre: ['', Validators.compose([Validators.required])],
            apellido: ['', Validators.compose([Validators.required])],
            tipo_documento: ['', Validators.compose([Validators.required])],
            numero_identidad: ['', Validators.compose([Validators.required])],
            lugar_nacimiento: ['', Validators.compose([Validators.required])],
            genero: ['', Validators.compose([Validators.required])],
            estado_civil: ['', Validators.compose([Validators.required])],
            nivel_educativo: ['', Validators.compose([Validators.required])],
            historia_clinica: ['', Validators.compose([Validators.required])],
            fecha_nacimiento: ['', Validators.compose([Validators.required])],
            fecha: ['', Validators.compose([Validators.required])],
            nivel_socioeconomico: ['', Validators.compose([Validators.required])],
            ocupacion: ['', Validators.compose([Validators.required])],
            telefono_celular: ['', Validators.compose([Validators.required])],
            telefono_fijo: ['', Validators.compose([Validators.required])],
            correo: [''],
            direccion: ['', Validators.compose([Validators.required])],
            responsable: [''],
            telefono_responsable: ['']
        });
    };
    HomePage.prototype.validateFormPersonal = function () {
        var _this = this;
        if (this.formPersonales.valid) {
            this.guardarForm().then(function () {
                _this.navController.navigateForward('medicos');
            }); // aqui guarda los datos asignados 
        }
        else {
            this.formSubmit = true; // controla que el mensaje salga cuando intenta cambiar de pantalla
        }
    };
    HomePage.prototype.ngOnInit = function () {
        this._loadEps();
        this._loadTipoDocumento();
        this._loadGenero();
        this._loadEstadoCivil();
        this._loadNivelSocioeconomico();
        this._loadNivelEducativo();
    };
    HomePage.prototype.guardarForm = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('form').then(function (form) {
                var form2 = form;
                if (form == undefined) {
                    form2 = {};
                }
                var value = _this.formPersonales.value;
                form2.formPersonales = {
                    eps: value.eps,
                    nombre: value.nombre,
                    apellido: value.apellido,
                    tipo_documento: value.tipo_documento,
                    numero_identidad: value.numero_identidad,
                    lugar_nacimiento: value.lugar_nacimiento,
                    genero: value.genero,
                    estado_civil: value.estado_civil,
                    nivel_educativo: value.nivel_educativo,
                    historia_clinica: value.historia_clinica,
                    fecha_nacimiento: value.fecha_nacimiento,
                    fecha: value.fecha,
                    nivel_socioeconomico: value.nivel_socioeconomico,
                    ocupacion: value.ocupacion,
                    telefono_celular: value.telefono_celular,
                    telefono_fijo: value.telefono_fijo,
                    correo: value.correo === undefined ? '' : value.correo,
                    direccion: value.direccion,
                    responsable: value.responsable === undefined ? '' : value.responsable,
                    telefono_responsable: value.telefono_responsable === undefined ? '' : value.telefono_responsable
                };
                _this.storage.set('form', form2).then(function (data) {
                    resolve(data);
                }); // aqui guarda los datos asignados   
            });
        });
    };
    HomePage.prototype._loadEps = function () {
        var _this = this;
        this.epsService.getEpsList().valueChanges().subscribe(function (data) {
            _this.epsList$ = data;
            if (_this.paciente !== null) {
                _this.selectEps.selectedText = _this.paciente.eps;
                _this.formPersonales.get('eps').setValue(_this.paciente.eps);
            }
        });
    };
    HomePage.prototype._loadTipoDocumento = function () {
        var _this = this;
        this.tipoDocumentoService.getTipoDocumentoList().valueChanges().subscribe(function (data) {
            _this.tipoDocumentoList$ = data;
            if (_this.paciente !== null) {
                _this.selectTipoDocumento.selectedText = _this.paciente.tipo_documento;
                _this.formPersonales.get('tipo_documento').setValue(_this.paciente.tipo_documento);
            }
        });
    };
    HomePage.prototype._loadGenero = function () {
        var _this = this;
        this.generoService.getGeneroList().valueChanges().subscribe(function (data) {
            _this.generoList$ = data;
            if (_this.paciente !== null) {
                _this.selectGenero.selectedText = _this.paciente.genero;
                _this.formPersonales.get('genero').setValue(_this.paciente.genero);
            }
        });
    };
    HomePage.prototype._loadEstadoCivil = function () {
        var _this = this;
        this.estadoCivilService.getEstadoCivilList().valueChanges().subscribe(function (data) {
            _this.estadoCivilList$ = data;
            if (_this.paciente !== null) {
                _this.selectEstadoCivil.selectedText = _this.paciente.estado_civil;
                _this.formPersonales.get('estado_civil').setValue(_this.paciente.estado_civil);
            }
        });
    };
    HomePage.prototype._loadNivelSocioeconomico = function () {
        var _this = this;
        this.nivelSocioeconomicoService.getNivelSocioeconomicoList().valueChanges().subscribe(function (data) {
            _this.nivelSocioeconomicoList$ = data;
            if (_this.paciente !== null) {
                _this.selectNivelSocioeconomico.selectedText = _this.paciente.nivel_socioeconomico;
                _this.formPersonales.get('nivel_socioeconomico').setValue(_this.paciente.nivel_socioeconomico);
            }
        });
    };
    HomePage.prototype._loadNivelEducativo = function () {
        var _this = this;
        this.nivelEducativoService.getNivelEducativoList().valueChanges().subscribe(function (data) {
            _this.nivelEducativoList$ = data;
            if (_this.paciente !== null) {
                _this.selectNivelEducativo.selectedText = _this.paciente.nivel_educativo;
                _this.formPersonales.get('nivel_educativo').setValue(_this.paciente.nivel_educativo);
            }
        });
    };
    HomePage.prototype.irAtras = function () {
        this.navController.pop();
    };
    tslib_1.__decorate([
        ViewChild('selectEps'),
        tslib_1.__metadata("design:type", IonSelect)
    ], HomePage.prototype, "selectEps", void 0);
    tslib_1.__decorate([
        ViewChild('selectTipoDocumento'),
        tslib_1.__metadata("design:type", IonSelect)
    ], HomePage.prototype, "selectTipoDocumento", void 0);
    tslib_1.__decorate([
        ViewChild('selectGenero'),
        tslib_1.__metadata("design:type", IonSelect)
    ], HomePage.prototype, "selectGenero", void 0);
    tslib_1.__decorate([
        ViewChild('selectNivelEducativo'),
        tslib_1.__metadata("design:type", IonSelect)
    ], HomePage.prototype, "selectNivelEducativo", void 0);
    tslib_1.__decorate([
        ViewChild('selectNivelSocioeconomico'),
        tslib_1.__metadata("design:type", IonSelect)
    ], HomePage.prototype, "selectNivelSocioeconomico", void 0);
    tslib_1.__decorate([
        ViewChild('selectEstadoCivil'),
        tslib_1.__metadata("design:type", IonSelect)
    ], HomePage.prototype, "selectEstadoCivil", void 0);
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [UserService,
            NavController,
            Storage,
            FormBuilder,
            EpsService,
            TipoDocumentoService,
            GeneroService,
            EstadoCivilService,
            NivelSocioeconomicoService,
            NivelEducativoService])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map