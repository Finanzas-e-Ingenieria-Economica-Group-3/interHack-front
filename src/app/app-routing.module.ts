// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListComponent } from './components/list/list.component';
import { ListarbankComponent } from './components/bank/listarbank/listarbank.component';
import { ListarcompaniesComponent } from './components/companies/listarcompanies/listarcompanies.component';
import { ListarclientsComponent } from './components/clients/listarclients/listarclients.component';
import { CreaeditaclientsComponent } from './components/clients/creaeditaclients/creaeditaclients.component';
import { CreaeditainvoiceComponent } from './components/invoice/creaeditainvoice/creaeditainvoice.component';
import { ListarinvoiceComponent } from './components/invoice/listarinvoice/listarinvoice.component';
import { CreaeditaresportsComponent } from './components/reports/creaeditaresports/creaeditaresports.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list', component: ListComponent },
  { path: 'list/banks', component: ListarbankComponent},

  { path: 'clients', component: CreaeditaclientsComponent },
  { path: 'listclients', component: ListarclientsComponent },

  { path: 'createinvoice', component: CreaeditainvoiceComponent }, // Ruta para editar factura existente
  { path: 'listinvoices', component: ListarinvoiceComponent}, // Ruta para editar factura existente


  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: '', redirectTo: '/list', pathMatch: 'full' } ,// Redirección inicial
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
