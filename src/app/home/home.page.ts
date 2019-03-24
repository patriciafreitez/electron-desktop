import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {EstadoCivilService} from '../service/db/estado-civil.service';
import {EstadoCivil} from '../models/estado-civil';
import {Observable} from 'rxjs';
import {UserService} from '../service/db/user.service';
import {ActivatedRoute} from '@angular/router';
import { Storage } from '@ionic/storage';//importar manual
import { Eps } from '../models/eps';
import { EpsService } from '../service/db/eps.service';
import { Genero } from '../models/genero';
import { GeneroService } from '../service/db/genero.service';
import { TipoDocumento } from '../models/tipo-documento';
import { TipoDocumentoService } from '../service/db/tipo-documento.service';
import { RangoEdadService } from '../service/db/rango-edad.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RangoEdad } from '../models/rango-edad';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private formularioData: any = {};
  public formPersonales: FormGroup;
  public formSubmit = false;

  public estadoCivilList$: Observable<EstadoCivil[]>;
  public epsList$: Observable<Eps[]>;
  public generoList$: Observable<Genero[]>; 
  public tipoDocumentoList$: Observable<TipoDocumento[]>;

  constructor(
    public userService: UserService,
    private estadoService: EstadoCivilService,
    private navController: NavController,
    private storage: Storage,//importar manual
    private epsService: EpsService,
    private generoService: GeneroService,
    private formBuilder: FormBuilder,
    private tipoDocumentoService: TipoDocumentoService,

  ) {
    this.construirValidaciones()
    storage.get('email').then(email => {
      userService.findByEmail(email).snapshotChanges().subscribe(changes => {
        storage.set('root', changes.length > 0);
      });
    });

    var array: any=[
      {
        descripcion: "0 - 10", min: 0, max: 10
      },

      {
        descripcion: "11 - 17", min: 11, max: 17
      },
      {
        descripcion: "18 - 30", min: 18, max: 30
      },
      {
        descripcion: "31 - 50", min: 31, max: 50
      },
      {
        descripcion: "51 - 70", min: 51, max: 70
      },
      {
        descripcion: "mayores de 71", min: 71, max: 200
      }
    ]

    //rangoEdad.addAllRangoEdad(array); 
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
      nivel_educacion:      ['', Validators.compose([Validators.required])],
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
    this.formPersonales.get('eps').setValue('subsidiado');
    this.formPersonales.get('nombre').setValue('jose');
    this.formPersonales.get('apellido').setValue('duin');
    this.formPersonales.get('tipo_documento').setValue('cedula');
    this.formPersonales.get('numero_identidad').setValue('777987766');
    this.formPersonales.get('lugar_nacimiento').setValue('caracas');
    this.formPersonales.get('genero').setValue('femenino');
    this.formPersonales.get('estado_civil').setValue('soltero');
    this.formPersonales.get('nivel_educacion').setValue('Bachiller');
    this.formPersonales.get('historia_clinica').setValue('8578967586');
    this.formPersonales.get('fecha_nacimiento').setValue('13/04/92');
    this.formPersonales.get('fecha').setValue('22/03/19');
    this.formPersonales.get('nivel_socioeconomico').setValue('alto');
    this.formPersonales.get('ocupacion').setValue('ingeniero');
    this.formPersonales.get('telefono_celular').setValue('8576567567');
    this.formPersonales.get('telefono_fijo').setValue('857659877');
    this.formPersonales.get('correo').setValue('hola@');
    this.formPersonales.get('direccion').setValue('españa');
    this.formPersonales.get('responsable').setValue('juana la cubana');
    this.formPersonales.get('telefono_responsable').setValue('766856798');


    if(this.formPersonales.valid) {

      this.guardarForm().then(()=>{
        this.navController.navigateForward('medicos');
      });// aqui guarda los datos asignados 

    }
    else{
      this.formSubmit = true; // controla que el mensaje salga cuando intenta cambiar de pantalla
    }
  }

  ngOnInit() {
    this._loadEstadoCivil();
    this._loadEps();
    this._loadGenero();
    this._loadTipoDocumento();

  }
  guardarForm(){
    return new Promise((resolve, reject)=>{
      this.storage.get("form").then(form =>{
        var form2: any = form;
        if (form == undefined ){
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
          nivel_educacion:      value.nivel_educacion,
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

  _loadEstadoCivil() {
    this.estadoCivilList$ = this.estadoService.getEstadoCivilList().valueChanges();
  }
  _loadEps(){
    this.epsList$ = this.epsService.getEpsList().valueChanges();
  }
  _loadGenero() {
    this.generoList$ = this.generoService.getGenero().valueChanges();
  }
  _loadTipoDocumento() {
    this.tipoDocumentoList$ = this.tipoDocumentoService.getTipoDocumentoList().valueChanges();
  }
  

  


  

}
