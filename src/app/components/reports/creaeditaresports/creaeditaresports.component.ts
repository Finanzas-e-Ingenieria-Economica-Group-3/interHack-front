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
import { Invoice } from '../../../models/invoice';
import { InvoiceService } from '../../../services/invoice.service';

@Component({
  selector: 'app-creaeditaresports',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './creaeditaresports.component.html',
  styleUrl: './creaeditaresports.component.css'
})
export class CreaeditaresportsComponent {

  
}
