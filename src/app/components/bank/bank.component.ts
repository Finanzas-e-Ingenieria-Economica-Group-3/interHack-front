import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarbankComponent } from './listarbank/listarbank.component';

@Component({
  selector: 'app-bank',
  standalone: true,
  imports: [
   ListarbankComponent,
   RouterOutlet
  ],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.css'
})
export class BankComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
