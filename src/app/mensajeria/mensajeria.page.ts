import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { EpsService } from '../service/db/eps.service';
import { EstadoCivilService } from '../service/db/estado-civil.service';
import { GeneroService } from '../service/db/genero.service';
import { TipoDocumentoService } from '../service/db/tipo-documento.service';
import { NivelEducativoService } from '../service/db/nivel-educativo.service';
import { NivelSocioeconomicoService } from '../service/db/nivel-socioeconomico.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.page.html',
  styleUrls: ['./mensajeria.page.scss'],
})
export class MensajeriaPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private angularFireAuth: AngularFireAuth,
    private storage: Storage,
    private eps: EpsService,
    private estadocivil: EstadoCivilService,
    private genero: GeneroService,
    private tipodocumento: TipoDocumentoService,
    private nivelsocioeconomico: NivelSocioeconomicoService,
    private niveleducativo: NivelEducativoService,

  ) 
  { var arrayEps: any=[
      {
        descripcion: "Contributivo"
      },
      {
        descripcion: "Otro"
      },
      {
        descripcion: "Ninguno"
      }
    ] 
    eps.addAllEps(arrayEps);

    var arrayEstadoCivil: any=[
      {
        descripcion: "Soltero"
      },
      {
        descripcion: "Casado"
      },
      {
        descripcion: "Union libre"
      },
      {
        descripcion: "Viudo"
      }
    ] 
    estadocivil.addAllEstadoCivil(arrayEstadoCivil);

    var arrayGenero: any=[
      {
        descripcion: "Femenino"
      },
      {
        descripcion: "Masculino"
      }
    ]
    genero.addAllGenero(arrayGenero);
    
    var arrayTipoDocumento: any=[
      {
        descripcion: "Tarjeta de Identidad"
      },
      {
        descripcion: "Registro Civil"
      },
      {
        descripcion: "Cedula de Ciudadania"
      },
      {
        descripcion: "Cedula de Extrangeria"
      },
      {
        descripcion: "Pasaporte"
      },
    ]
    tipodocumento.addAllTipoDocumento(arrayTipoDocumento);
    
    var arrayNivelSocioeconomico : any = [
      {
        descripcion: "Alto"
      },
      {
        descripcion: "Medio"
      },
      {
        descripcion: "Bajo"
      }
    ]
    nivelsocioeconomico.addNivelSocioeconomico(arrayNivelSocioeconomico);
  
   var arrayNivelEducativo : any = [
      {
        descripcion: "Primaria"
      },
      {
        descripcion: "Secundaria"
      },
      {
        descripcion: "Tecnico"
      },
      {
        descripcion: "Universitario"
      }
    ]
  nivelsocioeconomico.addNivelSocioeconomico(arrayNivelSocioeconomico);
  }
  
  ngOnInit() {}
  
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
