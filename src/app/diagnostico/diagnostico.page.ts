import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.page.html',
  styleUrls: ['./diagnostico.page.scss'],
})
export class DiagnosticoPage implements OnInit {
  public formDiagnostico: FormGroup;
  public formSubmit = false;

  Gingivitis = false;
  Patologia = false;
  Onicofagia = false;
  SuccionLabial = false;
  SuccionDigital = false;
  InterposicionLingual = false;


  constructor(
    private formBuilder: FormBuilder,//libreria a importar
    private navController: NavController,
    private storage: Storage,
  ) { 
    this.loadParams();
    this.construirValidaciones();
  }
  loadParams() {//se guardan los datos de la pantalla pasada para sobre escribir enn formulario data
    this.storage.get('form').then(form => {
      console.log(form);
      if(form.formDiagnostico !== undefined) {
        const formDiagnostico = form.formDiagnostico;
        this.formDiagnostico.get('cariados').setValue(formDiagnostico.cariados);
        this.formDiagnostico.get('opturados').setValue(formDiagnostico.opturados);
        this.formDiagnostico.get('perdidos').setValue(formDiagnostico.perdidos);
        this.formDiagnostico.get('periodontitis').setValue(formDiagnostico.periodontitis);
        this.formDiagnostico.get('patologia').setValue(formDiagnostico.patologia);
        this.formDiagnostico.get('gingivitis').setValue(formDiagnostico.gingivitis);
        this.formDiagnostico.get('malPosiciones').setValue(formDiagnostico.malPosiciones);
        this.formDiagnostico.get('onicofagia').setValue(formDiagnostico.onicofagia);
        this.formDiagnostico.get('succionLabial').setValue(formDiagnostico.succionLabial);
        this.formDiagnostico.get('succionDigital').setValue(formDiagnostico.succionDigital);
        this.formDiagnostico.get('interposicionLingual').setValue(formDiagnostico.interposicionLingual);
      }
    });
  }
  construirValidaciones() {
    this.formDiagnostico = this.formBuilder.group({ 
      cariados:      ['', Validators.compose([Validators.required])],
      opturados:     ['', Validators.compose([Validators.required])],
      perdidos:      ['', Validators.compose([Validators.required])],
      periodontitis: [false],//false xq son checkboox
      patologia:     [''],
      gingivitis:    [''],
      malPosiciones: ['', Validators.compose([Validators.required])],
      onicofagia:    [''],
      succionLabial: [''],
      succionDigital:[''],
      interposicionLingual:    ['']



    });
  }
  IrAtras() {
    this.guardarForm().then(()=>{
      this.navController.navigateBack('medicos');
    })
  }
  guardarForm(){
    return new Promise((resolve, reject)=>{
      this.storage.get("form").then((form: any) =>{
        form.formDiagnostico = this.formDiagnostico.value;
        this.storage.set('form', form).then(data=>{
          resolve(data);
        });// aqui guarda los datos asignados   
      })
    })
   
  }
  registrar(){
    
  }
  ngOnInit() {
  }

}
