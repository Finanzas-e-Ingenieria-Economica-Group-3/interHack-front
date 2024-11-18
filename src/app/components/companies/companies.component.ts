import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarclientsComponent } from "../clients/listarclients/listarclients.component";

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [ListarclientsComponent,RouterOutlet],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
