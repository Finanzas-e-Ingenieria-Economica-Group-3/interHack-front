import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterEvent, RouterLink } from '@angular/router';
import { Client } from '../../../models/clients';
import { Company } from '../../../models/company';
import { Params } from 'express-jwt';
import { ClientsService } from '../../../services/clients.service';
import { CompaniesService } from '../../../services/companies.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-creaeditaclients',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterLink,
    MatSnackBarModule,


  ],
  templateUrl: './creaeditaclients.component.html',
  styleUrl: './creaeditaclients.component.css'
})

export class CreaeditaclientsComponent implements OnInit {
  form: FormGroup;
  edicion: boolean = false;
  companyId: number | null = null;
  clientId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private clientsService: ClientsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clientId = params['id'] ? +params['id'] : 0; 
      this.edicion = this.clientId > 0;
      this.companyId = +localStorage.getItem('companyId')!;

      if (this.edicion) {
        this.loadClientData(this.clientId);
      } else if (!this.companyId) {
        this.showSnackbar('No se encontró el ID de la compañía');
        this.router.navigate(['/clients']);
      }
    });
  }

  private loadClientData(clientId: number): void {
    this.clientsService.getClientById(clientId).subscribe(response => {
      this.form.patchValue(response); // Usa directamente `response` si ya es `Client`
    });
  }
  
  saveClient(): void {
    const client = this.form.value as Client;
    if (this.edicion) {
      this.clientsService.updateClient(this.clientId, client).subscribe(() => {
        this.showSnackbar('Se actualizó exitosamente');
        this.router.navigate(['/listclients']);
      });
    } else if (this.companyId) {
      this.clientsService.createClient(this.companyId, client).subscribe(() => {
        this.showSnackbar('Cliente creado');
        this.router.navigate(['/listclients']);
      }, error => {
        this.showSnackbar('Error al crear cliente');
      });
    } else {
      this.showSnackbar('No se encontró el ID de la compañía');
    }
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  resetForm(): void {
    this.form.reset();
  }
  goToList(): void {
    this.router.navigate(['/listclients']);
  }
  
}
