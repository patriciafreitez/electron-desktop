import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { RangoEdadService } from '../service/db/rango-edad.service';
import { PatologiaService } from '../service/db/patologia.service';
import { PacienteService } from '../service/db/paciente.service';
import { Storage } from '@ionic/storage'; //importar manual
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../service/db/user.service';
import * as moment from 'moment';
var ConsultarPage = /** @class */ (function () {
    function ConsultarPage(navController, rangoEdadService, patologiaService, pacienteService, storage, userService, alertController) {
        this.navController = navController;
        this.rangoEdadService = rangoEdadService;
        this.patologiaService = patologiaService;
        this.pacienteService = pacienteService;
        this.storage = storage;
        this.userService = userService;
        this.alertController = alertController;
        this.rangoEdadList = [];
        this.patologiaList = [];
        this.pacientesList = [];
        this.pacientesObservable = [];
        this.listPacienteVacia = 'Buscando pacientes..';
        this.pdfIsGenerate = false;
        this.rangoEdad = '';
        this.patologia = [];
        this.isRoot = false;
        this.isUserRoot();
    }
    ConsultarPage.prototype.ngOnInit = function () {
        this._loadRangoEdad();
        this._loadPatologia();
        this._loadPaciente();
    };
    ConsultarPage.prototype.isUserRoot = function () {
        var _this = this;
        this.storage.get('email').then(function (email) {
            _this.userService.findByEmail(email).snapshotChanges().subscribe(function (changes) {
                _this.isRoot = changes.length > 0;
                _this.storage.set('root', _this.isRoot);
            });
        });
    };
    ConsultarPage.prototype.verPaciente = function (paciente) {
        var _this = this;
        var params = { disabled: false, paciente: paciente };
        this.storage.set('disabled', params).then(function () {
            _this.navController.navigateForward('basico');
        });
    };
    ConsultarPage.prototype._loadRangoEdad = function () {
        var _this = this;
        this.rangoEdadService.getRangoEdad().valueChanges().subscribe(function (data) {
            _this.rangoEdadList = data;
        });
    };
    ConsultarPage.prototype._loadPatologia = function () {
        var _this = this;
        this.patologiaService.getPatologia().valueChanges().subscribe(function (data) {
            _this.patologiaList = data;
        });
    };
    ConsultarPage.prototype._loadPaciente = function () {
        var _this = this;
        this.pacienteService.getPaciente().valueChanges().subscribe(function (data) {
            _this.pacientesList = data.slice(0);
            _this.pacientesObservable = data.slice(0);
            _this.filtros();
        });
    };
    ConsultarPage.prototype.filtros = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.pacientesObservable = this.pacientesList.slice(0);
                if (this.pacientesList.length > 0) {
                    this.filterRangoEdad();
                    this.filterPatologia();
                }
                this.listPacienteVacia = (this.pacientesList.length > 0 ? '' : 'No se encontraron resultados');
                return [2 /*return*/];
            });
        });
    };
    ConsultarPage.prototype.filterRangoEdad = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rango, index, paciente, fecha_nacimiento, fecha_actual, diff;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (this.rangoEdad === '' || this.rangoEdad === 'Todos')
                    return [2 /*return*/];
                rango = this.rangoEdadList.find(function (rango) { return rango.descripcion === _this.rangoEdad; });
                for (index = 0; index < this.pacientesObservable.length; index++) {
                    paciente = this.pacientesObservable[index];
                    fecha_nacimiento = moment(paciente.fecha_nacimiento);
                    fecha_actual = moment();
                    diff = fecha_actual.diff(fecha_nacimiento, 'years');
                    if (!(diff >= rango.min && diff <= rango.max)) {
                        this.pacientesObservable.splice((index), 1);
                        index--;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ConsultarPage.prototype.filterPatologia = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var patologia, caries, ausencia_dental, index, paciente;
            return tslib_1.__generator(this, function (_a) {
                if (this.patologia.length === 0)
                    return [2 /*return*/];
                patologia = false, caries = false, ausencia_dental = false;
                this.patologia.forEach(function (value) {
                    switch (value) {
                        case "Auencia dental":
                            ausencia_dental = true;
                            break;
                        case "Caries":
                            caries = true;
                            break;
                        case "Patología atm":
                            patologia = true;
                            break;
                    }
                });
                for (index = 0; index < this.pacientesObservable.length; index++) {
                    paciente = this.pacientesObservable[index];
                    // Descartamos los pacientes que no presentan alguna patologia
                    if (!((paciente.patologia && patologia)
                        || (paciente.caries && caries)
                        || (paciente.ausencia_dental && ausencia_dental))) {
                        this.pacientesObservable.splice((index), 1);
                        index--;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ConsultarPage.prototype.generatePdf = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var doc, rows, headers;
            return tslib_1.__generator(this, function (_a) {
                this.pdfIsGenerate = true;
                doc = new jsPDF(), rows = [], headers = [
                    "Número Identificación",
                    "Nombre",
                    "Apellido",
                    "Dirección",
                    "Teléfonos",
                    "Observación"
                ];
                this.pacientesObservable.forEach(function (paciente) {
                    var temp = [
                        paciente.numero_identidad,
                        paciente.nombre,
                        paciente.apellido,
                        paciente.direccion,
                        paciente.telefono_celular + " \n" + paciente.telefono_fijo,
                        paciente.observaciones
                    ];
                    rows.push(temp);
                });
                doc.text('Listado de pacientes', 14, 15);
                doc.autoTable({
                    head: [headers],
                    body: rows,
                    startY: 20
                });
                doc.save('listado de pacientes.pdf');
                this.pdfIsGenerate = false;
                return [2 /*return*/];
            });
        });
    };
    ConsultarPage.prototype.presentAlertConfirm = function (paciente) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirmación',
                            message: "\u00BFDesea borrar el paciente? <p>" + paciente.nombre + " " + paciente.apellido + "</p>",
                            cssClass: 'custom-select',
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () { }
                                }, {
                                    text: 'Eliminar',
                                    handler: function () {
                                        _this.pacienteService.removePaciente(paciente);
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConsultarPage = tslib_1.__decorate([
        Component({
            selector: 'app-consultar',
            templateUrl: './consultar.page.html',
            styleUrls: ['./consultar.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            RangoEdadService,
            PatologiaService,
            PacienteService,
            Storage,
            UserService,
            AlertController])
    ], ConsultarPage);
    return ConsultarPage;
}());
export { ConsultarPage };
//# sourceMappingURL=consultar.page.js.map