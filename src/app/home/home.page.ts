import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, IonSelect} from '@ionic/angular';
import {UserService} from '../service/db/user.service';
import { Storage } from '@ionic/storage';//importar manual

import { Eps } from '../models/eps';
import { EpsService } from '../service/db/eps.service';
import { TipoDocumento } from '../models/tipo-documento';
import { TipoDocumentoService } from '../service/db/tipo-documento.service';
import { Genero } from '../models/genero';
import { GeneroService } from '../service/db/genero.service';
import { EstadoCivilService } from '../service/db/estado-civil.service';
import { EstadoCivil } from '../models/estado-civil';
import { NivelSocioeconomicoService } from '../service/db/nivel-socioeconomico.service';
import { NivelSocioeconomico } from '../models/nivel-socioeconomico';
import { NivelEducativoService } from '../service/db/nivel-educativo.service';
import { NivelEducativo } from '../models/nivel-educativo';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Paciente } from '../models/paciente';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('selectEps') selectEps: IonSelect;
  @ViewChild('selectTipoDocumento') selectTipoDocumento: IonSelect;
  @ViewChild('selectGenero') selectGenero: IonSelect;
  @ViewChild('selectNivelEducativo') selectNivelEducativo: IonSelect;
  @ViewChild('selectNivelSocioeconomico') selectNivelSocioeconomico: IonSelect;
  @ViewChild('selectEstadoCivil') selectEstadoCivil: IonSelect;

  private formularioData: any = {};
  public formPersonales: FormGroup;
  public formSubmit = false;
  public interfaceOptions = { cssClass: 'custom-select' }
  public soloVista: false;
  private paciente: Paciente = null;

  public epsList$: Array<Eps> = [];
  public tipoDocumentoList$: Array<TipoDocumento> = [];
  public generoList$: Array<Genero> = []; 
  public estadoCivilList$: Array<EstadoCivil> = [];
  public nivelSocioeconomicoList$: Array<NivelSocioeconomico> = [];
  public nivelEducativoList$: Array<NivelEducativo> = [];

  constructor(
    public userService: UserService,
    private navController: NavController,
    private storage: Storage,//importar manual
    private formBuilder: FormBuilder,
    private epsService: EpsService,
    private tipoDocumentoService: TipoDocumentoService,
    private generoService: GeneroService,    
    private estadoCivilService: EstadoCivilService,
    private nivelSocioeconomicoService: NivelSocioeconomicoService,
    private nivelEducativoService: NivelEducativoService
    ) {
      this.isUserRoot();
      this.construirValidaciones()
      this.verPaciente();
  }

  verPaciente() {
    this.storage.get('disabled').then((data) => {
      this.soloVista = data.disabled;
      this.paciente = data.paciente;

      if(this.paciente !== null) {
        console.log(this.paciente)
        this.formPersonales.get('nombre').setValue(this.paciente.nombre);
        this.formPersonales.get('apellido').setValue(this.paciente.apellido);
        this.formPersonales.get('numero_identidad').setValue(this.paciente.numero_identidad);
        this.formPersonales.get('lugar_nacimiento').setValue(this.paciente.lugar_nacimiento);
        this.formPersonales.get('historia_clinica').setValue(this.paciente.historia_clinica);
        this.formPersonales.get('fecha_nacimiento').setValue(this.paciente.fecha_nacimiento);
        this.formPersonales.get('fecha').setValue(this.paciente.fecha);
        this.formPersonales.get('ocupacion').setValue(this.paciente.ocupacion);
        this.formPersonales.get('telefono_celular').setValue(this.paciente.telefono_celular);
        this.formPersonales.get('telefono_fijo').setValue(this.paciente.telefono_fijo);
        this.formPersonales.get('correo').setValue(this.paciente.correo);
        this.formPersonales.get('direccion').setValue(this.paciente.direccion);
        this.formPersonales.get('responsable').setValue(this.paciente.responsable);
        this.formPersonales.get('telefono_responsable').setValue(this.paciente.telefono_responsable);
      }
     
    })
  }

  isUserRoot() {
    this.storage.get('root').then((isRoot: boolean) => {
      if(!isRoot) {
        this.navController.navigateRoot(['mensajeria']);
      }
    });
  }

  construirValidaciones(){
    this.formPersonales = this.formBuilder.group({ 
      eps:                  ['', Validators.compose([Validators.required])],//valida que el campo sea obligatorio
      nombre:               ['', Validators.compose([Validators.required])],
      apellido:             ['', Validators.compose([Validators.required])],
      tipo_documento:       ['', Validators.compose([Validators.required])],
      numero_identidad:     ['', Validators.compose([Validators.required])],
      lugar_nacimiento:     ['', Validators.compose([Validators.required])],
      genero:               ['', Validators.compose([Validators.required])],
      estado_civil:         ['', Validators.compose([Validators.required])],
      nivel_educativo:      ['', Validators.compose([Validators.required])],
      historia_clinica:     ['', Validators.compose([Validators.required])],
      fecha_nacimiento:     ['', Validators.compose([Validators.required])],
      fecha:                ['', Validators.compose([Validators.required])],
      nivel_socioeconomico: ['', Validators.compose([Validators.required])],
      ocupacion:            ['', Validators.compose([Validators.required])],
      telefono_celular:     ['', Validators.compose([Validators.required])],
      telefono_fijo:        ['', Validators.compose([Validators.required])],
      correo:               [''],
      direccion:            ['', Validators.compose([Validators.required])],
      responsable:          [''],
      telefono_responsable: ['']
    });
  }

  validateFormPersonal() {
    console.log(this.formPersonales.value);
    if(this.formPersonales.valid) {
      this.guardarForm().then(() => {
        this.navController.navigateForward('medicos');
      });// aqui guarda los datos asignados 
    }
    else{
      this.formSubmit = true; // controla que el mensaje salga cuando intenta cambiar de pantalla
    }
  }

  ngOnInit() {
    this._loadEps();
    this._loadTipoDocumento();
    this._loadGenero();
    this._loadEstadoCivil();
    this._loadNivelSocioeconomico();
    this._loadNivelEducativo();
  }

  guardarForm(){
    return new Promise((resolve, reject)=>{
      this.storage.get('form').then(form =>{
        var form2: any = form;
        if (form == undefined ) {
          form2 = {}
        }
        const value = this.formPersonales.value;
        form2.formPersonales = {
          eps:                  value.eps,
          nombre:               value.nombre,
          apellido:             value.apellido,
          tipo_documento:       value.tipo_documento,
          numero_identidad:     value.numero_identidad,
          lugar_nacimiento:     value.lugar_nacimiento,
          genero:               value.genero,
          estado_civil:         value.estado_civil,
          nivel_educativo:      value.nivel_educativo,
          historia_clinica:     value.historia_clinica,
          fecha_nacimiento:     value.fecha_nacimiento,
          fecha:                value.fecha,
          nivel_socioeconomico: value.nivel_socioeconomico,
          ocupacion:            value.ocupacion,
          telefono_celular:     value.telefono_celular,
          telefono_fijo:        value.telefono_fijo,
          correo:               value.correo === undefined ? '' : value.correo,
          direccion:            value.direccion,
          responsable:          value.responsable === undefined ? '' : value.responsable,
          telefono_responsable: value.telefono_responsable === undefined ? '' : value.telefono_responsable
        }
        this.storage.set('form', form2).then(data=>{
          resolve(data);
        });// aqui guarda los datos asignados   
      })
    })
   
  }

  _loadEps(){
    this.epsService.getEpsList().valueChanges().subscribe((data) => {
      this.epsList$ = data
      if(this.paciente !== null) {
        this.selectEps.selectedText = this.paciente.eps;
        this.formPersonales.get('eps').setValue(this.paciente.eps)
      }
    });
  }
  _loadTipoDocumento() {
    this.tipoDocumentoService.getTipoDocumentoList().valueChanges().subscribe((data) => {
      this.tipoDocumentoList$ = data
      if(this.paciente !== null) {
        this.selectTipoDocumento.selectedText = this.paciente.tipo_documento
        this.formPersonales.get('tipo_documento').setValue(this.paciente.tipo_documento);
      }
    });
  }
  _loadGenero() {
    this.generoService.getGeneroList().valueChanges().subscribe((data) => {
      this.generoList$ = data
      if(this.paciente !== null) {
        this.selectGenero.selectedText = this.paciente.genero
        this.formPersonales.get('genero').setValue(this.paciente.genero);
      }
    });
  }
  _loadEstadoCivil() {
    this.estadoCivilService.getEstadoCivilList().valueChanges().subscribe((data) => {
      this.estadoCivilList$ = data
      if(this.paciente !== null) {
        this.selectEstadoCivil.selectedText = this.paciente.estado_civil
        this.formPersonales.get('estado_civil').setValue(this.paciente.estado_civil);
      }
    });
  }
  _loadNivelSocioeconomico() {
    this.nivelSocioeconomicoService.getNivelSocioeconomicoList().valueChanges().subscribe((data) => {
      this.nivelSocioeconomicoList$ = data
      if(this.paciente !== null) {
        this.selectNivelSocioeconomico.selectedText = this.paciente.nivel_socioeconomico
        this.formPersonales.get('nivel_socioeconomico').setValue(this.paciente.nivel_socioeconomico);
      }
    });
  }
  _loadNivelEducativo() {
    this.nivelEducativoService.getNivelEducativoList().valueChanges().subscribe((data) => {
      this.nivelEducativoList$ = data
      if(this.paciente !== null) {
        this.selectNivelEducativo.selectedText = this.paciente.nivel_educativo
        this.formPersonales.get('nivel_educativo').setValue(this.paciente.nivel_educativo);
      }
    });
  }  
}
