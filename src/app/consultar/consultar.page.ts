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
  protected rangoEdadList$: Observable<RangoEdad[]>;
  protected patologiaList$: Observable<Patologia[]>;
  protected pacientesList$: Observable<Paciente[]>;

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
    this.rangoEdadList$ = this.rangoEdadService.getRangoEdad().valueChanges();
  }

  _loadPatologia() {
    this.patologiaList$ = this.patologiaService.getPatologia().valueChanges();
  }

  _loadPaciente() {
    this.pacientesList$ = this.pacienteService.getPaciente().valueChanges();
  }
}
