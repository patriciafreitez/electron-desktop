import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private formularioData: any = {};
  public formPersonales: FormGroup;
  public formSubmit = false;
  public interfaceOptions = { cssClass: 'custom-select' }
  public epsList$: Observable<Eps[]>;
  public tipoDocumentoList$: Observable<TipoDocumento[]>;
  public generoList$: Observable<Genero[]>; 
  public estadoCivilList$: Observable<EstadoCivil[]>;
  public nivelSocioeconomicoList$: Observable<NivelSocioeconomico[]>;
  public nivelEducativoList$: Observable<NivelEducativo[]>;

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
    this.epsList$ = this.epsService.getEpsList().valueChanges();
  }
  _loadTipoDocumento() {
    this.tipoDocumentoList$ = this.tipoDocumentoService.getTipoDocumentoList().valueChanges();
  }
  _loadGenero() {
    this.generoList$ = this.generoService.getGeneroList().valueChanges();
  }
  _loadEstadoCivil() {
    this.estadoCivilList$ = this.estadoCivilService.getEstadoCivilList().valueChanges();
  }
  _loadNivelSocioeconomico() {
    this.nivelSocioeconomicoList$ = this.nivelSocioeconomicoService.getNivelSocioeconomicoList().valueChanges();
  }
  _loadNivelEducativo() {
    this.nivelEducativoList$ = this.nivelEducativoService.getNivelEducativoList().valueChanges();
  }  
}
