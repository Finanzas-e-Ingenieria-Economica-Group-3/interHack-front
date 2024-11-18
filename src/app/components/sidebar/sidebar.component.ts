import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  showSidebar = signal(false);

  navItems = [
   // { routerLink: '/dashboard', icon: 'fal fa-home', text: 'Dashboard' },
   // { routerLink: '/profile', icon: 'fal fa-chart-bar', text: 'Perfil' },
    { routerLink: '/clients', icon: 'fal fa-plus', text: 'Añadir Cliente' },
    { routerLink: '/list', icon: 'fal fa-list', text: 'Listar Bancos' },
  
   // { routerLink: '/notification', icon: 'fal fa-envelope', text: 'Notificacion' },
   // { routerLink: '/settings', icon: 'fal fa-cog', text: 'Settings' }
  ];
  constructor(private router: Router) {}

  toggleSidebar() {
    this.showSidebar.set(!this.showSidebar());
    
  }
 
  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

} 
