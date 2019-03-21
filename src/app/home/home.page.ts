import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {EstadoCivilService} from '../service/db/estado-civil.service';
import {EstadoCivil} from '../models/estado-civil';
import {Observable} from 'rxjs';
import {UserService} from '../service/db/user.service';
import {ActivatedRoute} from '@angular/router';
import { Storage } from '@ionic/storage';
import { Eps } from '../models/eps';
import { EpsService } from '../service/db/eps.service';
import { Genero } from '../models/genero';
import { GeneroService } from '../service/db/genero.service';
import { TipoDocumento } from '../models/tipo-documento';
import { TipoDocumentoService } from '../service/db/tipo-documento.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public estadoCivilList$: Observable<EstadoCivil[]>;
  public epsList$: Observable<Eps[]>;
  public generoList$: Observable<Genero[]>; 
  public tipoDocumentoList$: Observable<TipoDocumento[]>;

  constructor(
      private route: ActivatedRoute,
      private navController: NavController,
      private angularFireAuth: AngularFireAuth,
      private estadoService: EstadoCivilService,
      private userService: UserService,
      private storage: Storage,
      private epsService: EpsService,
      private generoService: GeneroService,
      private tipoDocumentoService: TipoDocumentoService
  ) {
    storage.get('email').then(email => {
      userService.findByEmail(email).snapshotChanges().subscribe(changes => {
        storage.set('root', changes.length > 0);
      });
    });
  }

  ngOnInit() {
    this._loadEstadoCivil();
    this._loadEps();
    this._loadGenero();
    this._loadTipoDocumento();
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
