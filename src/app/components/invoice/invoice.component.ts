import { Component, OnInit } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarclientsComponent } from '../clients/listarclients/listarclients.component';
import { CreaeditaclientsComponent } from '../clients/creaeditaclients/creaeditaclients.component';
import { ListarinvoiceComponent } from "./listarinvoice/listarinvoice.component";

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    CreaeditaclientsComponent,
    RouterOutlet,
    MatSnackBarModule,
    ListarinvoiceComponent
],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent  implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
