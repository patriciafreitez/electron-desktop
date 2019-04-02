import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DiagnosticoPage } from './diagnostico.page';

const routes: Routes = [
  {
    path: '',
    component: DiagnosticoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, //permite hacer las validaciones
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DiagnosticoPage]
})
export class DiagnosticoPageModule {}
