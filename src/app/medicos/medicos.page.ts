import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';
import { reject } from 'q';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.page.html',
  styleUrls: ['./medicos.page.scss'],
})
export class MedicosPage implements OnInit {
  public formMedicos: FormGroup;
  public formSubmit = false;

  hipertensionArterial = false;
  diabetesMellitus = false;
  DiabetesGestacional = false;
  EnfermedadesTiroidales = false;
  EnfermedadesCardiovasculares = false;
  Drogadiccion = false;
  Embarazo = false;
  EnfermedadesGastrointestinales = false;
  Alergias = false;
  Sicologicos = false;
  Obesidad = false;
  Desnutricion = false;
  Sano = false;
  Fumador = false;

  constructor(
    private formBuilder: FormBuilder,//libreria a importar
    private navController: NavController,
    private storage: Storage,

  ) { 
    this.loadParams();
    this.construirValidaciones();
  }

  loadParams() {//se guardan los datos de la pantalla pasada para sobre escribir enn formulario data
    this.storage.get('form').then(form => {
      if(form.formMedicos !== undefined) {
        const formMedicos = form.formMedicos;
        this.formMedicos.get('hipertensionArterial').setValue(formMedicos.hipertensionArterial);
        this.formMedicos.get('diabetesMellitus').setValue(formMedicos.diabetesMellitus);
        this.formMedicos.get('diabetesGestacional').setValue(formMedicos.diabetesGestacional);
        this.formMedicos.get('enfermedadesTiroidales').setValue(formMedicos.enfermedadesTiroidales);
        this.formMedicos.get('enfermedadesCardiovasculares').setValue(formMedicos.enfermedadesCardiovasculares);
        this.formMedicos.get('drogadiccion').setValue(formMedicos.drogadiccion);
        this.formMedicos.get('embarazo').setValue(formMedicos.embarazo);
        this.formMedicos.get('desnutricion').setValue(formMedicos.desnutricion);
        this.formMedicos.get('sano').setValue(formMedicos.sano);
        this.formMedicos.get('vih').setValue(formMedicos.vih);
        this.formMedicos.get('enfermedadesGastrointestinales').setValue(formMedicos.enfermedadesGastrointestinales);
        this.formMedicos.get('alergias').setValue(formMedicos.alergias);
        this.formMedicos.get('sicologicos').setValue(formMedicos.sicologicos);
        this.formMedicos.get('obesidad').setValue(formMedicos.obesidad);
        this.formMedicos.get('fumador').setValue(formMedicos.fumador);
        this.formMedicos.get('cigarrosDia').setValue(formMedicos.cigarrosDia);
        this.formMedicos.get('observaciones').setValue(formMedicos.observaciones);
      }
    });
  }
  construirValidaciones() {
    this.formMedicos = this.formBuilder.group({ 
      hipertensionArterial:         [false],//valida que el campo sea obligatorio
      diabetesMellitus:             [false],
      diabetesGestacional:          [false],
      enfermedadesTiroidales:       [false],
      enfermedadesCardiovasculares: [false],
      drogadiccion:                 [false],
      embarazo:                     [false],
      desnutricion:                 [false],
      sano:                         [false],
      vih:                          [false],
      enfermedadesGastrointestinales: [false],
      alergias:                     [false],
      sicologicos:                  [false],
      obesidad:                     [false],
      fumador:                      [false],//false xq son checkboox
      cigarrosDia:                  [''],
      observaciones:                ['']
    });
  }

  validateFormMedicos() {
    console.log(this.formMedicos.value);
    if(this.formMedicos.valid) {

      this.guardarForm().then(()=>{
        this.navController.navigateForward('diagnostico');
      })
    }
  }

  IrAtras() {
    this.guardarForm().then(()=>{
      this.navController.navigateBack('home');
    })
  }

  guardarForm(){
    return new Promise((resolve, reject)=>{
      this.storage.get("form").then((form: any) =>{
        form.formMedicos = this.formMedicos.value;
        this.storage.set('form', form).then(data=>{
          resolve(data);
        });// aqui guarda los datos asignados   
      })
    })
   
  }

  ngOnInit() {
  }

}
