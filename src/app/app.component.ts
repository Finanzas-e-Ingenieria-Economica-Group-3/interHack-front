import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CuerpoComponent } from './components/cuerpo/cuerpo.component';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar'; //para la parte de donde se pone el list todo eso
import { MatSelectModule } from '@angular/material/select';

import { MatMenuModule } from '@angular/material/menu';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    NgIf,
    CommonModule,
    SidebarComponent,
    CuerpoComponent,
    //parte del sidenav
    DashboardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'finanzas';
  showSiderbar = signal(true);
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private loginService: LoginService, private router: Router) {
    if (this.verificar()) {
      this.router.navigate(['/dashboard']);
    }
  }

  cerrar() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  verificar() {
    return this.loginService.verificar();
  }

  toggleSidebar() {
    this.showSiderbar.set(!this.showSiderbar());
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}

