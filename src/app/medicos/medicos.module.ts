import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MedicosPage } from './medicos.page';

const routes: Routes = [
  {
    path: '',
    component: MedicosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, //permite hacer las validaciones
    RouterModule.forChild(routes)
  ],
  declarations: [MedicosPage]
})
export class MedicosPageModule {}
