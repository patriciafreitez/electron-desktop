import { Injectable } from '@angular/core';
import { Eps } from 'src/app/models/eps';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EpsService {

  private epsListRef = this.db.list<Eps>('eps-list');

  constructor(private db: AngularFireDatabase) { }
  getEpsList() {
    return this.epsListRef;
  }
  filterByDescripcion(descripcion: string) {
    return this.db.list('/eps-list', ref => ref.orderByChild('descripcion').equalTo(descripcion));
  }
  addEps(eps: Eps) {
    return this.epsListRef.push(eps);
  }
  addAllEps(eps: any){
    eps.forEach((element:Eps) => {
      this.addEps(element)
    });
  }
  editEps(eps: Eps) {
    return this.epsListRef.update(eps.key, eps);
  }
  removeEps(eps: Eps) {
    return this.epsListRef.remove(eps.key);
  }
  
}
