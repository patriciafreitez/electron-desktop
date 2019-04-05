import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { UserService } from '../service/db/user.service';
import { MessageService } from '../service/message.service';
import { Mensaje } from '../../app/models/mensaje';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.page.html',
  styleUrls: ['./mensajeria.page.scss'],
})
export class MensajeriaPage implements OnInit {
  public isRoot = false;

  public mensajes = [];
  public msj : string;

  //public mensajes = any [ ];
  public mensajeList$: Observable<Mensaje[]>;
  public mensaje = Mensaje;

  constructor(
    public route: ActivatedRoute,
    private navController: NavController,
    private angularFireAuth: AngularFireAuth,
    private storage: Storage,
    private userService: UserService,
    private messageService: MessageService,
    
  ) {
    this.isUserRoot();

    var arrayMensaje: any=[
      { contenido: "mensaje 1" },
      { date: "fecha" }
    ]
   // messageService.addAllMensaje(arrayMensaje);
    
    var arrayEps: any=[
      { descripcion: "Subsidiado" },
      { descripcion: "Contributivo" },
      { descripcion: "Otro" },
      { descripcion: "Ninguno" },
    ] 
    //eps.addAllEps(arrayEps);

    var arrayTipoDocumento: any=[
      { descripcion: "Tarjeta de Identidad" },
      { descripcion: "Registro Civil" },
      { descripcion: "Cedula de Ciudadania" },
      { descripcion: "Cedula de Extrangeria" },
      { descripcion: "Pasaporte" },
    ]
    //tipodocumento.addAllTipoDocumento(arrayTipoDocumento);

    var arrayGenero: any=[
      { descripcion: "Masculino" },
      { descripcion: "Femenino" }, 
    ]
    //genero.addAllGenero(arrayGenero);

    var arrayEstadoCivil: any=[
      { descripcion: "Soltero" },
      { descripcion: "Casado" },
      { descripcion: "Union libre" },
      { descripcion: "Viudo" },
    ] 
    //estadocivil.addAllEstadoCivil(arrayEstadoCivil);

    var arrayNivelSocioeconomico: any=[
      { descripcion: "Alto" },
      { descripcion: "Medio" },
      { descripcion: "Bajo" },
    ]
    //nivelsocioeconomico.addAllNivelSocioeconomico(arrayNivelSocioeconomico);
  
    var arrayNivelEducativo = [
      { descripcion: "Primaria" },
      { descripcion: "Secundaria" },
      { descripcion: "Tecnico" },
      { descripcion: "Universitario" },
    ]
    //niveleducativo.addAllNivelEducativo(arrayNivelEducativo);

    var arrayPatalogia = [
      { descripcion: "Auencia dental" },
      { descripcion: "Caries" },
      { descripcion: "Patología atm" },
      { descripcion: "No posee" }
    ]
    //patologiaService.addAllPatologia(arrayPatalogia);

    var arrayPatalogia = [
      { descripcion: "Localizada" },
      { descripcion: "General" },
      { descripcion: "No posee" }
    ]
    //periodontitisService.addAllPeriodontitis(arrayPatalogia)

  }
  
  sendMessage(){

    const mensaje : Mensaje = {
    contenido : this.msj,
    date : new Date()
    }
  this.messageService.sendMsgToFirebase(mensaje, contenido);
  this.msj = "";
  }

  enviarMensaje(){
    this.mensajes.push(this.mensaje); 
  }

  /*enviarMensaje(){
    this.mensajes.push(this.mensaje); 
  }*/

  abrirFormulario() {
    const params = { disabled: false, paciente: null };
    this.storage.set('disabled', params).then(() => {
      this.navController.navigateForward('basico');
    })
  }

  isUserRoot() {
    this.storage.get('email').then(email => {
      this.userService.findByEmail(email).snapshotChanges().subscribe(changes => {
        this.isRoot = changes.length > 0;
        this.storage.set('root', this.isRoot);
      });
    });
  }
  
  cerrarSesion() {
    this.angularFireAuth.auth.signOut().then(() => {
      this.storage.remove('email');
      this.storage.remove('root');

      this.navController.navigateRoot(['']);
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit() {
    this._loadMensaje();
  }

  _loadMensaje(){
    this.mensajeList$ = this.messageService.getMensajeList().valueChanges(); //un obsevable
  }


}
