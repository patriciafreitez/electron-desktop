import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {EstadoCivil} from '../../models/estado-civil';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {
   private estadoCivilListRef = this.db.list<EstadoCivil>('estado-civil-list');

  constructor(private db: AngularFireDatabase) { }

  getEstadoCivilList() {
    return this.estadoCivilListRef;
  }

  filterByDescripcion(descripcion: string) {
    return this.db.list('/estado-civil-list', ref => ref.orderByChild('descripcion').equalTo(descripcion));
  }

  addEstadoCivil(estadoCivil: EstadoCivil) {
    return this.estadoCivilListRef.push(estadoCivil);
  }

  editEstadoCivil(estadoCivil: EstadoCivil) {
    return this.estadoCivilListRef.update(estadoCivil.key, estadoCivil);
  }

  removeEstadoCivil(estadoCivil: EstadoCivil) {
    return this.estadoCivilListRef.remove(estadoCivil.key);
  }
}
