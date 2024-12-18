import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Client } from '../../../models/clients';
import { ClientsService } from '../../../services/clients.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-listarclients',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './listarclients.component.html',
  styleUrl: './listarclients.component.css'
})
export class ListarclientsComponent implements OnInit{
  displayedColumns: string[] = ['clientId', 'name', 'lastname', 'email', 'dni', 'actions'];
  dataSource = new MatTableDataSource<Client>();
  isLoading: boolean = false;
  errorMessage: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clientsService: ClientsService, private router: Router) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.isLoading = true;
    // @ts-ignore
    this.clientsService.getClientsByCompanyId(localStorage.getItem("companyId")).subscribe(
      (response) => {
        this.dataSource.data = response.data || []; // Access 'response.data'
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading clients:', error);
        this.isLoading = false;
      }
    );
  }

  deleteClient(clientId: number): void {
    this.clientsService.deleteClient(clientId).subscribe(
      () => {
        this.getClients(); // Reload list after deletion
      },
      (error) => {
        console.error('Error deleting client:', error);
      }
    );
  }

  addInvoice(clientId: number): void {
    this.router.navigate(['/createinvoice'], { queryParams: { clientId } });
  }

  listInvoices(clientId: number): void {
    this.router.navigate(['/listinvoices'], { queryParams: { clientId } });
  }
}
