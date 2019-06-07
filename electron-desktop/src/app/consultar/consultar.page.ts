import { Component, OnInit } from '@angular/core';
import { RangoEdadService } from '../service/db/rango-edad.service';
import { RangoEdad } from '../models/rango-edad';
import { PatologiaService } from '../service/db/patologia.service';
import { Patologia } from '../models/patologia';
import { Paciente } from '../models/paciente';
import { PacienteService } from '../service/db/paciente.service';
import { Storage } from '@ionic/storage';//importar manual
import {NavController, AlertController} from '@ionic/angular';
import { UserService } from '../service/db/user.service';
import * as moment from 'moment';

declare let jsPDF;

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.page.html',
  styleUrls: ['./consultar.page.scss'],
})
export class ConsultarPage implements OnInit {
  public rangoEdadList: Array<RangoEdad> = [];
  public patologiaList: Array<Patologia> = [];
  public pacientesList: Array<Paciente> = [];
  public pacientesObservable: Array<Paciente> = [];
  public listPacienteVacia = 'Buscando pacientes..';
  public pdfIsGenerate = false;
  public rangoEdad = '';
  public patologia = [];
  public isRoot = false;

  constructor(
    private navController: NavController,
    private rangoEdadService: RangoEdadService,
    private patologiaService: PatologiaService,
    private pacienteService: PacienteService,
    private storage: Storage,
    private userService: UserService,
    public alertController: AlertController
  ) { 
    this.isUserRoot();
  }

  ngOnInit() {
    this._loadRangoEdad();
    this._loadPatologia();
    this._loadPaciente();
  }

  isUserRoot() {
    this.storage.get('email').then(email => {
      this.userService.findByEmail(email).snapshotChanges().subscribe(changes => {
        this.isRoot = changes.length > 0;
        this.storage.set('root', this.isRoot);
      });
    });
  }

  verPaciente(paciente) {
    const params = { disabled: true, paciente: paciente };
    this.storage.set('disabled', params).then(() => {
      this.navController.navigateForward('basico');
    })
  }

  _loadRangoEdad() {
    this.rangoEdadService.getRangoEdad().valueChanges().subscribe((data) => {
      this.rangoEdadList = data;
    });
  }

  _loadPatologia() {
    this.patologiaService.getPatologia().valueChanges().subscribe((data) => {
      this.patologiaList = data;
    });
  }

  _loadPaciente() {
    this.pacienteService.getPaciente().valueChanges().subscribe((data) => {
      this.pacientesList = data.slice(0);
      this.pacientesObservable = data.slice(0);

      this.filtros();
    });
  }

  async filtros() {
    this.pacientesObservable = this.pacientesList.slice(0);
    if(this.pacientesList.length > 0) {
      this.filterRangoEdad()
      this.filterPatologia();
    }
    this.listPacienteVacia = (this.pacientesList.length > 0 ? '' : 'No se encontraron resultados');
  }

  async filterRangoEdad() {
    if(this.rangoEdad === '' || this.rangoEdad === 'Todos') return;
    // Buscamos el rango de edad
    const rango = this.rangoEdadList.find(rango => rango.descripcion === this.rangoEdad);
    for(var index = 0; index < this.pacientesObservable.length; index++) {
      const paciente: Paciente = this.pacientesObservable[index];
      // Calculamos la diferencia en años entre la fecha de nacimiento y fecha actual
      const fecha_nacimiento = moment(paciente.fecha_nacimiento);
      const fecha_actual = moment();
      const diff = fecha_actual.diff(fecha_nacimiento, 'years');

      if(!(diff >= rango.min && diff <= rango.max)) {
        this.pacientesObservable.splice((index), 1);
        index--;
      }
    }
  }

  async filterPatologia() {
    if(this.patologia.length === 0) return;
    // Buscamos los check que estan en true
    var patologia = false, caries = false, ausencia_dental = false;
    this.patologia.forEach((value) => {
      switch(value) {
        case "Auencia dental": ausencia_dental = true; break;
        case "Caries": caries = true; break;
        case "Patología atm": patologia = true; break;
      }
    })

    for(var index = 0; index < this.pacientesObservable.length; index++) {
      const paciente: Paciente = this.pacientesObservable[index];
      // Descartamos los pacientes que no presentan alguna patologia
      if(!((paciente.patologia && patologia) 
        || (paciente.caries && caries) 
        || (paciente.ausencia_dental && ausencia_dental))) {
          this.pacientesObservable.splice((index), 1);
          index--;
      }
    }
  }

  async generatePdf() {
    this.pdfIsGenerate = true;
    var doc = new jsPDF(),
        rows = [],
        headers = [
      "Número Identificación",
      "Nombre",
      "Apellido",
      "Dirección",
      "Teléfonos",
      "Observación"
    ];
    
    this.pacientesObservable.forEach((paciente: Paciente) => {
      var temp = [
        paciente.numero_identidad,
        paciente.nombre,
        paciente.apellido,
        paciente.direccion,
        `${paciente.telefono_celular} \n${paciente.telefono_fijo}`,
        paciente.observaciones
      ]
      rows.push(temp);
    })

    doc.text('Listado de pacientes', 14, 15)
    doc.autoTable({ 
      head: [headers],
      body: rows,
      startY: 20
    });

    doc.save('listado de pacientes.pdf')
    this.pdfIsGenerate = false;
  }

  async presentAlertConfirm(paciente: Paciente) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Desea borrar el paciente? <p>${paciente.nombre} ${paciente.apellido}</p>`,
      cssClass: 'custom-select',
        buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Eliminar',
          handler: () => {
            this.pacienteService.removePaciente(paciente);
          }
        }
      ]
    });

    await alert.present();
  }
}
