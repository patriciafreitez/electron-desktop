import { Injectable } from '@angular/core';
import { Periodontitis } from 'src/app/models/periodontitis';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PeriodontitisService {
  private periodontitisListRef = this.db.list<Periodontitis>('periodontitis-list');

  constructor(private db: AngularFireDatabase) { }

  getPeriodontitis() {
    return this.periodontitisListRef;
  }
  filterByDescripcion(descripcion: string) {
    return this.db.list('/periodontitis-list', ref => ref.orderByChild('descripcion').equalTo(descripcion));
  }
  addPatologia(periodontitis: Periodontitis) {
    return this.periodontitisListRef.push(periodontitis);
  }
  addAllPeriodontitis(periodontitis: any){
    periodontitis.forEach((element:Periodontitis) => {
      this.addPatologia(element)
    });
  }
  editPeriodontitis(periodontitis: Periodontitis) {
    return this.periodontitisListRef.update(periodontitis.key, periodontitis);
  }
  removePeriodontitis(periodontitis: Periodontitis) {
    return this.periodontitisListRef.remove(periodontitis.key);
  }
}
