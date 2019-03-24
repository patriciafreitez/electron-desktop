import { Injectable } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private pacienteListRef = this.db.list<Paciente>('paciente-list');

  constructor(private db: AngularFireDatabase) { }

  getPaciente() {
    return this.pacienteListRef;
  }

  //filterByDescripcion(descripcion: string) {
  //  return this.db.list('/genero-list', ref => ref.orderByChild('descripcion').equalTo(descripcion));
  //}

  addPaciente(paciente: Paciente) {
    return this.pacienteListRef.push(paciente);
  }
  
  addAllPaciente(paciente: any) {
    console.log('addAllpacientes')
    paciente.forEach((element:Paciente) => {
      console.log('addAllpacientes_for')
      this.addPaciente(element)
    });
  }

  editPaciente(paciente: Paciente) {
    console.log('addAllpaciente', paciente)
    return this.pacienteListRef.update(paciente.key, paciente);
  }

  removePaciente(paciente: Paciente) {
    return this.pacienteListRef.remove(paciente.key);
  }


}
