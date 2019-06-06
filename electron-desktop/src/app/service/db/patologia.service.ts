import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Patologia } from 'src/app/models/patologia';

@Injectable({
  providedIn: 'root'
})
export class PatologiaService {
  private patologiaListRef = this.db.list<Patologia>('patologia-list');

  constructor(private db: AngularFireDatabase) { }

  getPatologia() {
    return this.patologiaListRef;
  }
  filterByDescripcion(descripcion: string) {
    return this.db.list('/patologia-list', ref => ref.orderByChild('descripcion').equalTo(descripcion));
  }
  addPatologia(patologia: Patologia) {
    return this.patologiaListRef.push(patologia);
  }
  addAllPatologia(patologia: any){
    patologia.forEach((element:Patologia) => {
      this.addPatologia(element)
    });
  }
  editPatologia(patologia: Patologia) {
    return this.patologiaListRef.update(patologia.key, patologia);
  }
  removePatologia(patologia: Patologia) {
    return this.patologiaListRef.remove(patologia.key);
  }
}