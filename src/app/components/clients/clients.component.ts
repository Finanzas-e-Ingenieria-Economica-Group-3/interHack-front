import { Component, OnInit } from '@angular/core';
import { ListarclientsComponent } from './listarclients/listarclients.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CreaeditaclientsComponent } from './creaeditaclients/creaeditaclients.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CreaeditaclientsComponent,
    ListarclientsComponent,
    RouterOutlet,
    MatSnackBarModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
