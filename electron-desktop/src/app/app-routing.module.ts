import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'basico', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'medicos', loadChildren: './medicos/medicos.module#MedicosPageModule' },
  { path: 'diagnostico', loadChildren: './diagnostico/diagnostico.module#DiagnosticoPageModule' },
  { path: 'consultar', loadChildren: './consultar/consultar.module#ConsultarPageModule' },
  { path: 'mensajeria', loadChildren: './mensajeria/mensajeria.module#MensajeriaPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
