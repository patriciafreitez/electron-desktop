import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MensajeriaPage } from './mensajeria.page';

const routes: Routes = [
  {
    path: '',
    component: MensajeriaPage
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
  declarations: [MensajeriaPage]
})
export class MensajeriaPageModule {}
