import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { InvoiceService } from '../../../services/invoice.service';
import { Invoice } from '../../../models/invoice';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '../../../models/clients';
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";

@Component({
  selector: 'app-creaeditainvoice',
  standalone: true,
  imports: [
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
  templateUrl: './creaeditainvoice.component.html',
  styleUrl: './creaeditainvoice.component.css'
})
export class CreaeditainvoiceComponent implements OnInit{
  form: FormGroup;
  clients: Client[] = [];
  id: string = "";
  isEditing: boolean = false;

  currencyOptions = [
    { value: 'PEN', viewValue: 'Soles' },
    { value: 'USD', viewValue: 'Dólares' },
  ];

  constructor(
    private invoiceService: InvoiceService,
    private clientsService: ClientsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      clientId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      currencyType: ['', Validators.required],
      issueDate: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = localStorage.getItem('companyId')!;
      this.isEditing = this.id != null;
      if (this.isEditing) {
        this.loadInvoice();
      }
    });

    this.clientsService.getAllClients().subscribe((response) => {
      this.clients = response.data || [];
    });
  }

  loadInvoice(): void {
    this.invoiceService.getInvoiceById(this.id).subscribe((response) => {
      const invoice = response.data;
      if (invoice) {
        this.form.patchValue({
          clientId: invoice.client?.clientId,
          amount: invoice.amount,
          currencyType: invoice.currencyType,
          issueDate: invoice.issueDate,
          dueDate: invoice.dueDate,
        });
      }
    });
  }

  saveInvoice(): void {
    let clientId: number;
    if (this.form.valid) {
      const invoice: Invoice = this.form.value;
      if (this.isEditing) {
        invoice.companyId = +this.id;

        console.log(invoice);
        clientId = invoice.clientId;
        this.invoiceService.createInvoice(invoice).subscribe(() => {
          this.router.navigate(['/listinvoices'], {queryParams: {clientId}});
        });
      } else {
        this.invoiceService.createInvoice(invoice).subscribe(() => {
          this.router.navigate(['/listinvoices'], {queryParams: {clientId}});
        });
      }
    }
  }
}
