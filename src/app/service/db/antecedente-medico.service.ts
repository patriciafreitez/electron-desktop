import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AntecedenteMedico} from '../../models/antecedente-medico';

@Injectable({
  providedIn: 'root'
})
export class AntecedenteMedicoService {

  private antecedenteMedicoListRef = this.db.list<AntecedenteMedico>('antecendete-medico-list');

  constructor(private db: AngularFireDatabase) { }

  getAntecedenteMedicoList() {
    return this.antecedenteMedicoListRef;
  }
  filterByDescripcion(descripcion: string) {
    return this.db.list('/antecendete-medico-list', ref => ref.orderByChild('descripcion').equalTo(descripcion));
  }
  addAntecedenteMedico(antecedenteMedico: AntecedenteMedico) {
    return this.antecedenteMedicoListRef.push(antecedenteMedico);
  }
  addAllAntecedenteMedico(antecedenteMedico: any){
    antecedenteMedico.forEach((element:AntecedenteMedico) => {
      this.addAntecedenteMedico(element)
    });
  }
  editAntecedenteMedico(antecedenteMedico: AntecedenteMedico) {
    return this.antecedenteMedicoListRef.update(antecedenteMedico.key, antecedenteMedico);
  }
  removeAntecedenteMedico(antecedenteMedico: AntecedenteMedico) {
    return this.antecedenteMedicoListRef.remove(antecedenteMedico.key);
  }
}
