import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ReportService } from '../../../services/report.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../../models/ApiReponse';
import { Invoice } from '../../../models/invoice';
import { Bank } from '../../../models/bank.model';
import { InvoiceService } from '../../../services/invoice.service';
import { BankService } from '../../../services/bank.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Report } from '../../../models/report';

@Component({
  selector: 'app-listarresports',
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
    MatProgressSpinner,
  ],
  templateUrl: './listarresports.component.html',
  styleUrl: './listarresports.component.css'
})
export class ListarresportsComponent implements OnInit{
  invoice:Invoice | null = null;
  report: Report | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private reportService: ReportService,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadReport();
  }

  private loadReport(): void {
    this.isLoading = true;

    const invoiceId = this.route.snapshot.params['invoiceId'];

    if (invoiceId) {
      this.invoiceService.getInvoiceById(invoiceId).subscribe(
        (response) => {
          this.invoice = Object.assign(new Invoice(), response.data);
        },
        (error) => {
          this.errorMessage = 'Error al cargar la factura.';
          console.error(error);
        }
      );

      this.reportService.getReportByInvoiceId(invoiceId).subscribe(
        (response) => {
          this.report = Object.assign(new Report(), response.data);
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = 'No hay reportes asociados';
          this.isLoading = false;
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'No se proporcionó un ID de reporte.';
      this.isLoading = false;
    }
  }

}
