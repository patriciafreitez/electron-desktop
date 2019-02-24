import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {EstadoCivilService} from '../service/db/estado-civil.service';
import {EstadoCivil} from '../models/estado-civil';
import {Observable} from 'rxjs';
import {UserService} from '../service/db/user.service';
import {ActivatedRoute} from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public estadoCivilList$: Observable<EstadoCivil[]>;

  constructor(
      private route: ActivatedRoute,
      private navController: NavController,
      private angularFireAuth: AngularFireAuth,
      private estadoService: EstadoCivilService,
      private userService: UserService,
      private storage: Storage
  ) {
    storage.get('email').then(email => {
      userService.findByEmail(email).snapshotChanges().subscribe(changes => {
        storage.set('root', changes.length > 0);
      });
    });
  }

  ngOnInit() {
    this._loadEstadoCivil();
  }

  _loadEstadoCivil() {
    this.estadoCivilList$ = this.estadoService.getEstadoCivilList().valueChanges();
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
