import { Injectable } from '@angular/core';
import { Genero } from 'src/app/models/genero';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private generoListRef = this.db.list<Genero>('genero-list');

  constructor(private db: AngularFireDatabase) { }

  getGeneroList() {
    return this.generoListRef;
  }

  filterByDescripcion(descripcion: string) {
    return this.db.list('/genero-list', ref => ref.orderByChild('descripcion').equalTo(descripcion));
  }

  addGenero(genero: Genero) {
    return this.generoListRef.push(genero);
  }
  
  addAllGenero(genero: any){
    genero.forEach((element:Genero) => {
      this.addGenero(element)
    });
  }

  editGenero(genero: Genero) {
    return this.generoListRef.update(genero.key, genero);
  }

  removeGenero(genero: Genero) {
    return this.generoListRef.remove(genero.key);
  }

}
