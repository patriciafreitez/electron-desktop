import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import {Observable} from 'rxjs';
import { RangoEdadService } from '../service/db/rango-edad.service';
import { RangoEdad } from '../models/rango-edad';


@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.page.html',
  styleUrls: ['./consultar.page.scss'],
})
export class ConsultarPage implements OnInit {
  protected rangoEdadList$: Observable<RangoEdad[]>;

  constructor(
    private rangoEdadService: RangoEdadService

  ) { 
   
  }

  ngOnInit() {
    this._loadRangoEdad();

  }
  _loadRangoEdad() {
    this.rangoEdadList$ = this.rangoEdadService.getRangoEdad().valueChanges();
  }
  

}
