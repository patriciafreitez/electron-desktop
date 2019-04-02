import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RangoEdadService } from '../service/db/rango-edad.service';
import { RangoEdad } from '../models/rango-edad';
import { PatologiaService } from '../service/db/patologia.service';
import { Patologia } from '../models/patologia';
import { Paciente } from '../models/paciente';
import { PacienteService } from '../service/db/paciente.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.page.html',
  styleUrls: ['./consultar.page.scss'],
})
export class ConsultarPage implements OnInit {
  protected rangoEdadList: Array<RangoEdad> = [];
  protected patologiaList: Array<Patologia> = [];
  protected pacientesList: Array<Paciente> = [];
  protected pacientesFilter: Array<Paciente> = [];
  public rangoEdad = '';
  public patologia = '';

  constructor(
    private rangoEdadService: RangoEdadService,
    private patologiaService: PatologiaService,
    private pacienteService: PacienteService
  ) { }

  ngOnInit() {
    this._loadRangoEdad();
    this._loadPatologia();
    this._loadPaciente();
  }

  _loadRangoEdad() {
    this.rangoEdadService.getRangoEdad().valueChanges().subscribe((data) => {
      this.rangoEdadList = data
    });
  }

  _loadPatologia() {
    this.patologiaService.getPatologia().valueChanges().subscribe((data) => {
      this.patologiaList = data;
    });
  }

  _loadPaciente() {
    this.pacienteService.getPaciente().valueChanges().subscribe((data) => {
      this.pacientesList = data;
      this.pacientesFilter = data;
    });
  }

  async filterRangoEdad() {
    if(this.rangoEdad === 'Todos') {
      this.pacientesFilter = this.pacientesList;
    } 
    else {
      const rango = this.rangoEdadList.find(rango => rango.descripcion === this.rangoEdad);
      this.pacientesFilter.forEach((paciente, index) => {
       
      })
    }
  }

  filterPatologia() {

  }
}
