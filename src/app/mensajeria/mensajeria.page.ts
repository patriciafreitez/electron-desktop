import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { UserService } from '../service/db/user.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.page.html',
  styleUrls: ['./mensajeria.page.scss'],
})
export class MensajeriaPage implements OnInit {
  public isRoot = false;

  constructor(
    public route: ActivatedRoute,
    private navController: NavController,
    private angularFireAuth: AngularFireAuth,
    private storage: Storage,
    private userService: UserService
  ) {
    this.isUserRoot();
    
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
  
  ngOnInit() {}

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
}
