import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Invoice } from '../../../models/invoice';
import { InvoiceService } from '../../../services/invoice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarinvoice',
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
    MatSnackBarModule,
    CommonModule,

  ],
  templateUrl: './listarinvoice.component.html',
  styleUrl: './listarinvoice.component.css'
})
export class ListarinvoiceComponent implements OnInit{
  dataSource: MatTableDataSource<Invoice> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'client',
    'amount',
    'currencyType',
    'issueDate',
    'dueDate',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  clientId: string | null = null;
  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.clientId = params['clientId'] || null;
      console.log('Client ID:', this.clientId);
    });
    this.loadInvoices();
  }


  loadInvoices(): void {
    // @ts-ignore
    this.invoiceService.getInvoicesByCompanyIdAndByClientId(localStorage.getItem("companyId"),this.clientId).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS' && response.data) {
          this.dataSource = new MatTableDataSource(response.data);
          this.dataSource.paginator = this.paginator;
        } else {
          console.warn('No se encontraron datos o hubo un problema:', response.message);
        }
      },
      error: (err) => {
        console.error('Error en la carga de facturas:', err);
      },
    });
  }


  addReport(invoiceId: number): void {
    this.router.navigate(['/add/report', invoiceId]);
  }



}
