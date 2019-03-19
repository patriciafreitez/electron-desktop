import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.page.html',
  styleUrls: ['./consultar.page.scss'],
})
export class ConsultarPage implements OnInit {
  pacientes: any=[];

  constructor() { 
    const pac1 = new User();
    pac1.email = 'algo'

    this.pacientes.push(pac1);
  }

  ngOnInit() {
  }

}
