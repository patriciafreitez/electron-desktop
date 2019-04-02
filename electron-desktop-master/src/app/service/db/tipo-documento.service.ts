import { Injectable } from '@angular/core';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private tipoDocumentoListRef = this.db.list<TipoDocumento>('tipo-documento-list');

  constructor(private db: AngularFireDatabase) { }
  
  getTipoDocumentoList() {
    return this.tipoDocumentoListRef;
  }
  
  filterByDescripcion(descripcion: string) {
    return this.db.list('/tipo-documento-list', ref => ref.orderByChild('descripcion').equalTo(descripcion));
  }
  
  addTipoDocumento(tipoDocumento: TipoDocumento) {
    return this.tipoDocumentoListRef.push(tipoDocumento);
  }
  
  addAllTipoDocumento(tipoDocumento: any) {
    tipoDocumento.forEach((element:TipoDocumento) => {
      this.addTipoDocumento(element)
      });
    }
  
  editTipoDocumento(tipoDocumento: TipoDocumento) {
    return this.tipoDocumentoListRef.update(tipoDocumento.key, tipoDocumento);
  }

  removeTipoDocumento(tipoDocumento: TipoDocumento) {
    return this.tipoDocumentoListRef.remove(tipoDocumento.key);
  }
  
}