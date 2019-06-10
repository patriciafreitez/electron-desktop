import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
var PacienteService = /** @class */ (function () {
    function PacienteService(db) {
        this.db = db;
        this.pacienteListRef = this.db.list('paciente-list');
    }
    PacienteService.prototype.getPaciente = function () {
        return this.pacienteListRef;
    };
    PacienteService.prototype.filterByDescripcion = function (descripcion) {
        return this.db.list('/genero-list', function (ref) { return ref.orderByChild('descripcion').equalTo(descripcion); });
    };
    PacienteService.prototype.addPaciente = function (paciente) {
        return this.pacienteListRef.push(paciente);
    };
    PacienteService.prototype.addAllPaciente = function (paciente) {
        var _this = this;
        paciente.forEach(function (element) {
            _this.addPaciente(element);
        });
    };
    /*editPaciente(paciente: Paciente) {
      return this.pacienteListRef.update(paciente.key, paciente);
    }*/
    PacienteService.prototype.editPaciente = function (paciente) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.pacienteListRef.query.once('value').then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var pkey = childSnapshot.key;
                        var chval = childSnapshot.val();
                        if (paciente.numero_identidad === chval.numero_identidad) {
                            _this.pacienteListRef.update(pkey, paciente);
                            return true;
                        }
                        ;
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    PacienteService.prototype.removePaciente = function (paciente) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.pacienteListRef.query.once('value').then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var pkey = childSnapshot.key;
                        var chval = childSnapshot.val();
                        if (paciente.nombre === chval.nombre && paciente.numero_identidad === chval.numero_identidad &&
                            paciente.obesidad === chval.obesidad && paciente.observaciones === chval.observaciones &&
                            paciente.ocupacion === chval.ocupacion && paciente.onicofagia === chval.onicofagia &&
                            paciente.opturados === chval.opturados && paciente.patologia === chval.patologia &&
                            paciente.perdidos === chval.perdidos && paciente.periodontitis === chval.periodontitis &&
                            paciente.responsable === chval.responsable && paciente.sano === chval.sano &&
                            paciente.sicologicos === chval.sicologicos && paciente.succion_digital === chval.succion_digital &&
                            paciente.succion_labial === chval.succion_labial && paciente.telefono_celular === chval.telefono_celular &&
                            paciente.telefono_fijo === chval.telefono_fijo && paciente.telefono_responsable === chval.telefono_responsable &&
                            paciente.tipo_documento === chval.tipo_documento && paciente.vih === chval.vih &&
                            paciente.alergias === chval.alergias && paciente.apellido === chval.apellido &&
                            paciente.ausencia_dental === chval.ausencia_dental && paciente.cariados === chval.cariados &&
                            paciente.estado_civil === chval.estado_civil && paciente.fecha_nacimiento === chval.fecha_nacimiento &&
                            paciente.eps === chval.eps && paciente.lugar_nacimiento === chval.lugar_nacimiento &&
                            paciente.genero === chval.genero && paciente.nivel_educativo === chval.nivel_educativo &&
                            paciente.historia_clinica === chval.historia_clinica && paciente.nivel_socioeconomico === chval.nivel_socioeconomico &&
                            paciente.fecha === chval.fecha && paciente.direccion === chval.direccion &&
                            paciente.correo === chval.correo && paciente.hipertension_arterial === chval.hipertension_arterial &&
                            paciente.diabetes_mellitus === chval.diabetes_mellitus && paciente.diabetes_gestacional === chval.diabetes_gestacional &&
                            paciente.enfermedades_tiroidales === chval.enfermedades_tiroidales && paciente.enfermedades_cardiovasculares === chval.enfermedades_cardiovasculares &&
                            paciente.drogadiccion === chval.drogadiccion && paciente.embarazo === chval.embarazo &&
                            paciente.enfermedades_gastrointestinales === chval.enfermedades_gastrointestinales && paciente.fumador === chval.fumador &&
                            paciente.desnutricion === chval.desnutricion && paciente.cigarros_dia === chval.cigarros_dia &&
                            paciente.gingivitis === chval.gingivitis && paciente.caries === chval.caries &&
                            paciente.mal_posiciones === chval.mal_posiciones && paciente.interposicion_lingual === chval.interposicion_lingual) {
                            _this.pacienteListRef.remove(pkey);
                            return true;
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    PacienteService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireDatabase])
    ], PacienteService);
    return PacienteService;
}());
export { PacienteService };
//# sourceMappingURL=paciente.service.js.map