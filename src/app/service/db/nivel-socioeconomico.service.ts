import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NivelSocioeconomico } from 'src/app/models/nivel-socioeconomico';

@Injectable({
  providedIn: 'root'
})
export class NivelSocioeconomicoService {
  private nivelSocioeconomicoListRef = this.db.list<NivelSocioeconomico>('nivel-socioeconomico-list');

 constructor(private db: AngularFireDatabase) { }

 getNivelSocioeconomicoList() {
   return this.nivelSocioeconomicoListRef;
 }
 filterByDescripcion(descripcion: string) {
   return this.db.list('/nivel-socioeconomico-list', ref => ref.orderByChild('descripcion').equalTo(descripcion));
 }
 addNivelSocioeconomico(nivelSocioeconomico: NivelSocioeconomico) {
   return this.nivelSocioeconomicoListRef.push(nivelSocioeconomico);
 }
 addAllNivelSocioeconomico(nivelSocioeconomico: any) {
  nivelSocioeconomico.forEach((element:NivelSocioeconomico) => {
    this. addNivelSocioeconomico(element)
    });
  }
 editNivelSocioeconomico(nivelSocioeconomico: NivelSocioeconomico) {
   return this.nivelSocioeconomicoListRef.update(nivelSocioeconomico.key, nivelSocioeconomico);
 }
 removeNivelSocioeconomico(nivelSocioeconomico: NivelSocioeconomico) {
   return this.nivelSocioeconomicoListRef.remove(nivelSocioeconomico.key);
 }
}
