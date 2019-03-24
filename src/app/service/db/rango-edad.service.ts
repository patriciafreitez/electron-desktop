import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { RangoEdad } from 'src/app/models/rango-edad';

@Injectable({
  providedIn: 'root'
})
export class RangoEdadService {

  private rangoEdadListRef = this.db.list<RangoEdad>('rango-edad-list');

  constructor(private db: AngularFireDatabase) { }

  getRangoEdad() {
    return this.rangoEdadListRef;
  }

  filterByDescripcion(descripcion: string) {
    return this.db.list('/rango-edad-list', ref => ref.orderByChild('descripcion').equalTo(descripcion));
  }

  addRangoEdad(rangoEdad: RangoEdad) {
    return this.rangoEdadListRef.push(rangoEdad);
  }
  
  addAllRangoEdad(rangoEdad: any){
    rangoEdad.forEach((element:RangoEdad) => {
      this.addRangoEdad(element)
    });
  }

  editRangoEdad(rangoEdad: RangoEdad) {
    return this.rangoEdadListRef.update(rangoEdad.key, rangoEdad);
  }

  removeRangoEdad(rangoEdad: RangoEdad) {
    return this.rangoEdadListRef.remove(rangoEdad.key);
  }

}
