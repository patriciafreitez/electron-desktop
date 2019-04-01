import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { RangoEdadService } from '../service/db/rango-edad.service';
import { RangoEdad } from '../models/rango-edad';
import { PatologiaService } from '../service/db/patologia.service';
import { Patologia } from '../models/patologia';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.page.html',
  styleUrls: ['./consultar.page.scss'],
})
export class ConsultarPage implements OnInit {
  protected rangoEdadList$: Observable<RangoEdad[]>;
  protected patologiaList$: Observable<Patologia[]>;

  constructor(
    private rangoEdadService: RangoEdadService,
    private patologiaService: PatologiaService
  ) { }

  ngOnInit() {
    this._loadRangoEdad();
    this._loadPatologia();
  }

  _loadRangoEdad() {
    this.rangoEdadList$ = this.rangoEdadService.getRangoEdad().valueChanges();
  }

  _loadPatologia() {
    this.patologiaList$ = this.patologiaService.getPatologia().valueChanges();
  }
}
