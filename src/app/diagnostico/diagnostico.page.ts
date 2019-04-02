import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { PacienteService } from '../service/db/paciente.service';
import { PeriodontitisService } from '../service/db/periodontitis.service';
import { Periodontitis } from '../models/periodontitis';
import {Observable} from 'rxjs';
import { Paciente } from '../models/paciente';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.page.html',
  styleUrls: ['./diagnostico.page.scss'],
})
export class DiagnosticoPage implements OnInit {
  public formDiagnostico: FormGroup;
  public formSubmit = false;
  public interfaceOptions = { cssClass: 'custom-select' }
  public periodontitisist$: Observable<Periodontitis[]>;
  public soloVista: false;

  constructor(
    private formBuilder: FormBuilder,//libreria a importar
    private navController: NavController,
    private storage: Storage,
    private pacienteService: PacienteService,
    private periodontitisService: PeriodontitisService
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
        this.formDiagnostico.get('cariados').setValue(paciente.cariados);
        this.formDiagnostico.get('opturados').setValue(paciente.opturados);
        this.formDiagnostico.get('perdidos').setValue(paciente.perdidos);
        this.formDiagnostico.get('periodontitis').setValue(paciente.periodontitis);
        this.formDiagnostico.get('patologia').setValue(paciente.patologia);
        this.formDiagnostico.get('gingivitis').setValue(paciente.gingivitis);
        this.formDiagnostico.get('mal_posiciones').setValue(paciente.mal_posiciones);
        this.formDiagnostico.get('onicofagia').setValue(paciente.onicofagia);
        this.formDiagnostico.get('succion_labial').setValue(paciente.succion_labial);
        this.formDiagnostico.get('succion_digital').setValue(paciente.succion_digital);
        this.formDiagnostico.get('interposicion_lingual').setValue(paciente.interposicion_lingual);
      }
    })
  }

  loadParams() {//se guardan los datos de la pantalla pasada para sobre escribir enn formulario data
    this.storage.get('form').then(form => {
      if(form.formDiagnostico !== undefined) {
        const formDiagnostico = form.formDiagnostico;
        this.formDiagnostico.get('cariados').setValue(formDiagnostico.cariados);
        this.formDiagnostico.get('opturados').setValue(formDiagnostico.opturados);
        this.formDiagnostico.get('perdidos').setValue(formDiagnostico.perdidos);
        this.formDiagnostico.get('periodontitis').setValue(formDiagnostico.periodontitis);
        this.formDiagnostico.get('patologia').setValue(formDiagnostico.patologia);
        this.formDiagnostico.get('gingivitis').setValue(formDiagnostico.gingivitis);
        this.formDiagnostico.get('mal_posiciones').setValue(formDiagnostico.mal_posiciones);
        this.formDiagnostico.get('onicofagia').setValue(formDiagnostico.onicofagia);
        this.formDiagnostico.get('succion_labial').setValue(formDiagnostico.succion_labial);
        this.formDiagnostico.get('succion_digital').setValue(formDiagnostico.succion_digital);
        this.formDiagnostico.get('interposicion_lingual').setValue(formDiagnostico.interposicion_lingual);
      }
    });
  }

  construirValidaciones() {
    this.formDiagnostico = this.formBuilder.group({ 
      cariados:             ['', Validators.compose([Validators.required])],
      opturados:            ['', Validators.compose([Validators.required])],
      perdidos:             ['', Validators.compose([Validators.required])],
      periodontitis:        [false],//false xq son checkboox
      patologia:            [false],
      gingivitis:           [false],
      mal_posiciones:       ['', Validators.compose([Validators.required])],
      onicofagia:           [false],
      succion_labial:       [false],
      succion_digital:      [false],
      interposicion_lingual:[false]
    });
  }

  IrAtras() {
    this.guardarForm().then(() => {
      this.navController.navigateBack('medicos');
    })
  }

  guardarForm(){
    return new Promise((resolve, reject)=>{
      this.storage.get("form").then((form: any) =>{
        const value = this.formDiagnostico.value;
        form.formDiagnostico = {
          cariados:             value.cariados,
          opturados:            value.opturados,
          perdidos:             value.perdidos,
          periodontitis:        value.periodontitis === undefined ? false : value.periodontitis,
          patologia:            value.patologia === undefined ? false : value.patologia,
          gingivitis:           value.gingivitis === undefined ? false : value.gingivitis,
          mal_posiciones:       value.mal_posiciones,
          onicofagia:           value.onicofagia === undefined ? false : value.onicofagia,
          succion_labial:       value.succion_labial === undefined ? false : value.succion_labial,
          succion_digital:      value.succion_digital === undefined ? false : value.succion_digital,
          interposicion_lingual:value.interposicion_lingual === undefined ? false : value.interposicion_lingual
        }
        this.storage.set('form', form).then(data => {
          resolve(data);
        });// aqui guarda los datos asignados   
      })
    })
   
  }
  
  registrar(){
    if(this.formDiagnostico.valid) {
      this.guardarForm().then((data) => {
        console.log(data);
        var user: any = {};
        for(let key in data){
          for(let key2 in data[key]){
            user[key2] = data[key][key2]
          }
        }
      console.log(user);
      this.pacienteService.addPaciente(user);
      this.storage.remove('form');
      this.navController.navigateBack('mensajeria');
      })
    } else {
      this.formSubmit = true; // controla que el mensaje salga cuando intenta cambiar de pantalla
    }
  }

  ngOnInit() {
    this._loadPeriodontitis();
  }

  _loadPeriodontitis(){
    this.periodontitisist$ = this.periodontitisService.getPeriodontitis().valueChanges();
  }
}
