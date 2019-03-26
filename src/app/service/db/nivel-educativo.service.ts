import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NivelEducativo } from 'src/app/models/nivel-educativo';

@Injectable({
  providedIn: 'root'
})
export class NivelEducativoService {
  private nivelEducativoListRef = this.db.list<NivelEducativo>('nivel-educativo-list');

  constructor(private db: AngularFireDatabase) { }

  getNivelEducativoList() {
    return this.nivelEducativoListRef;
  }

  filterByDescripcion(descripcion: string) {
    return this.db.list('/nivel-educativo-list', ref => ref.orderByChild('descripcion').equalTo(descripcion));
  }

  addNivelEducativo(nivelEducativo: NivelEducativo) {
    return this.nivelEducativoListRef.push(nivelEducativo);
  }
  
  addAllNivelEducativo(nivelEducativo: any){
    nivelEducativo.forEach((element:NivelEducativo) => {
      this.addNivelEducativo(element)
    });
  }

  editNivelEducativo(nivelEducativo: NivelEducativo) {
    return this.nivelEducativoListRef.update(nivelEducativo.key, nivelEducativo);
  }

  removeNivelEducativo(nivelEducativo: NivelEducativo) {
    return this.nivelEducativoListRef.remove(nivelEducativo.key);
  }

}
