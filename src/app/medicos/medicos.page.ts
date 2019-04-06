import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';
import { reject } from 'q';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { AntecedenteMedicoService } from '../service/db/antecedente-medico.service';
import { AntecedenteMedico } from '../models/antecedente-medico';
import { Paciente } from '../models/paciente';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.page.html',
  styleUrls: ['./medicos.page.scss'],
})
export class MedicosPage implements OnInit {
  public formMedicos: FormGroup;
  public formSubmit = false;
  public AntecendetesMedicosList$: Observable<AntecedenteMedico[]>;
  public soloVista: false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,//libreria a importar
    private navController: NavController,
    private storage: Storage,
    private angularFireAuth: AngularFireAuth,

    private antecedenteMedicoService: AntecedenteMedicoService,

  ) { 
    this.loadParams();
    this.construirValidaciones();
    this.verPaciente();
  }

  verPaciente() {
    this.storage.get('disabled').then((data) => {
      this.soloVista = data.disabled;
      if(data.paciente !== null) {
        const paciente: Paciente = data.paciente;
        this.formMedicos.get('hipertension_arterial').setValue(paciente.hipertension_arterial);
        this.formMedicos.get('diabetes_mellitus').setValue(paciente.diabetes_mellitus);
        this.formMedicos.get('diabetes_gestacional').setValue(paciente.diabetes_gestacional);
        this.formMedicos.get('enfermedades_tiroidales').setValue(paciente.enfermedades_tiroidales);
        this.formMedicos.get('enfermedades_cardiovasculares').setValue(paciente.enfermedades_cardiovasculares);
        this.formMedicos.get('drogadiccion').setValue(paciente.drogadiccion);
        this.formMedicos.get('embarazo').setValue(paciente.embarazo);
        this.formMedicos.get('desnutricion').setValue(paciente.desnutricion);
        this.formMedicos.get('sano').setValue(paciente.sano);
        this.formMedicos.get('vih').setValue(paciente.vih);
        this.formMedicos.get('enfermedades_gastrointestinales').setValue(paciente.enfermedades_gastrointestinales);
        this.formMedicos.get('alergias').setValue(paciente.alergias);
        this.formMedicos.get('sicologicos').setValue(paciente.sicologicos);
        this.formMedicos.get('obesidad').setValue(paciente.obesidad);
        this.formMedicos.get('fumador').setValue(paciente.fumador);
        this.formMedicos.get('cigarros_dia').setValue(paciente.cigarros_dia);
        this.formMedicos.get('observaciones').setValue(paciente.observaciones);
      }
    })
  }

  loadParams() {//se guardan los datos de la pantalla pasada para sobre escribir enn formulario data
    this.storage.get('form').then(form => {
      if(form.formMedicos !== undefined) {
        const formMedicos = form.formMedicos;
        this.formMedicos.get('hipertension_arterial').setValue(formMedicos.hipertension_arterial);
        this.formMedicos.get('diabetes_mellitus').setValue(formMedicos.diabetes_mellitus);
        this.formMedicos.get('diabetes_gestacional').setValue(formMedicos.diabetes_gestacional);
        this.formMedicos.get('enfermedades_tiroidales').setValue(formMedicos.enfermedades_tiroidales);
        this.formMedicos.get('enfermedades_cardiovasculares').setValue(formMedicos.enfermedades_cardiovasculares);
        this.formMedicos.get('drogadiccion').setValue(formMedicos.drogadiccion);
        this.formMedicos.get('embarazo').setValue(formMedicos.embarazo);
        this.formMedicos.get('desnutricion').setValue(formMedicos.desnutricion);
        this.formMedicos.get('sano').setValue(formMedicos.sano);
        this.formMedicos.get('vih').setValue(formMedicos.vih);
        this.formMedicos.get('enfermedades_gastrointestinales').setValue(formMedicos.enfermedades_gastrointestinales);
        this.formMedicos.get('alergias').setValue(formMedicos.alergias);
        this.formMedicos.get('sicologicos').setValue(formMedicos.sicologicos);
        this.formMedicos.get('obesidad').setValue(formMedicos.obesidad);
        this.formMedicos.get('fumador').setValue(formMedicos.fumador);
        this.formMedicos.get('cigarros_dia').setValue(formMedicos.cigarros_dia);
        this.formMedicos.get('observaciones').setValue(formMedicos.observaciones);
      }
    });
  }
  construirValidaciones() {
    this.formMedicos = this.formBuilder.group({ 
      hipertension_arterial:         [false],//valida que el campo sea obligatorio
      diabetes_mellitus:             [false],
      diabetes_gestacional:          [false],
      enfermedades_tiroidales:       [false],
      enfermedades_cardiovasculares: [false],
      drogadiccion:                 [false],
      embarazo:                     [false],
      desnutricion:                 [false],
      sano:                         [false],
      vih:                          [false],
      enfermedades_gastrointestinales: [false],
      alergias:                     [false],
      sicologicos:                  [false],
      obesidad:                     [false],
      fumador:                      [false],//false xq son checkboox
      cigarros_dia:                 [''],
      observaciones:                ['']
    });
  }

  validateFormMedicos() {
    if(this.formMedicos.valid) {
      this.guardarForm().then(()=>{
        this.navController.navigateForward('diagnostico');
      })
    }
  }

  IrAtras() {
    this.guardarForm().then(()=>{
      this.navController.navigateBack('basico');
    })
  }

  guardarForm(){
    return new Promise((resolve, reject)=>{
      this.storage.get("form").then((form: any) =>{
        const value = this.formMedicos.value;
        form.formMedicos = {
          hipertension_arterial:          value.hipertension_arterial === undefined ? false : value.hipertension_arterial, 
          diabetes_mellitus:              value.diabetes_mellitus === undefined ? false : value.diabetes_mellitus,
          diabetes_gestacional:           value.diabetes_gestacional === undefined ? false : value.diabetes_gestacional,
          enfermedades_tiroidales:        value.enfermedades_tiroidales === undefined ? false : value.enfermedades_tiroidales,
          enfermedades_cardiovasculares:  value.enfermedades_cardiovasculares === undefined ? false : value.enfermedades_cardiovasculares,
          drogadiccion:                   value.drogadiccion === undefined ? false : value.drogadiccion,
          embarazo:                       value.embarazo === undefined ? false : value.embarazo,
          desnutricion:                   value.desnutricion === undefined ? false : value.desnutricion,
          sano:                           value.sano === undefined ? false : value.sano,
          vih:                            value.vih === undefined ? false : value.vih,
          enfermedades_gastrointestinales: value.enfermedades_gastrointestinales === undefined ? false : value.enfermedades_gastrointestinales,
          alergias:                       value.alergias === undefined ? false : value.alergias,
          sicologicos:                    value.sicologicos === undefined ? false : value.sicologicos,
          obesidad:                       value.obesidad === undefined ? false : value.obesidad,
          fumador:                        value.fumador === undefined ? false : value.fumador,
          cigarros_dia:                   value.cigarros_dia === undefined ? false : value.cigarros_dia,
          observaciones:                  value.observaciones === undefined ? false : value.observaciones
        }
        this.storage.set('form', form).then(data=>{
          resolve(data);
        });// aqui guarda los datos asignados   
      })
    })
   
  }

  ngOnInit() {
    this._loadAntecenteMedico();
  }
  _loadAntecenteMedico() {
    this.AntecendetesMedicosList$ = this.antecedenteMedicoService.getAntecedenteMedicoList().valueChanges();
  }

}
