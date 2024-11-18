import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bank } from '../../../models/bank.model';
import { ReportService } from '../../../services/report.service';
import { BankService } from '../../../services/bank.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-creaeditaresports',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule,
    MatSnackBarModule,
    RouterLink,
    MatProgressSpinnerModule,


  ],
  templateUrl: './creaeditaresports.component.html',
  styleUrl: './creaeditaresports.component.css'
})
export class CreaeditaresportsComponent implements OnInit {
  form: FormGroup;
  banks: Bank[] = [];
  invoiceId: string | null = null;
  bankDetails = { period: '', type: '', value: '' };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bankService: BankService,
    private reportService: ReportService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      invoiceId: ['', Validators.required],
      bankId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Capturar el invoiceId desde los parámetros de la URL
    this.route.params.subscribe((params) => {
      this.invoiceId = params['invoiceId'];
      const invoiceId = this.invoiceId;
      this.form.patchValue({ invoiceId }); // Setear el ID del invoice en el formulario
    });

    // Cargar bancos
    this.bankService.getBanks();
    this.bankService.getList().subscribe((data) => {
      this.banks = data || [];
    });

    // Detectar cambios en el banco seleccionado
    this.form.get('bankId')?.valueChanges.subscribe((bankId) => {
      this.updateBankDetails(bankId);
    });
  }

  updateBankDetails(bankId: number): void {
    const selectedBank = this.banks.find((bank) => bank.bankId === bankId);
    if (selectedBank && selectedBank.rate) {
      const rate = selectedBank.rate;
      this.bankDetails = {
        period: rate.period,
        type: rate.type,
        value: `${(rate.value * 100).toFixed(2)}%`, // Convertir a porcentaje
      };
    }
  }

  saveReport(): void {
    if (this.form.valid) {
      const { invoiceId, bankId } = this.form.value;
      this.reportService.createReport(invoiceId, bankId).subscribe((response) => {
        console.log('API Response:', response); // Verifica que el campo reportId está presente en response.data
      });
      this.showSnackbar('Reporte creado exitosamente');
    }
  }


  listReport() {
    console.log('Listar reportes');
    this.router.navigate(['/listarreports', this.invoiceId]);
  }
  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
