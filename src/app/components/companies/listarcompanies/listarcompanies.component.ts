import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../../services/companies.service';
import { Company } from '../../../models/company';

@Component({
  selector: 'app-listarcompanies',
  standalone: true,
  imports: [],
  templateUrl: './listarcompanies.component.html',
  styleUrl: './listarcompanies.component.css'
})
export class ListarcompaniesComponent implements OnInit{
  company: Company = new Company();

  constructor(private companiesService: CompaniesService) {}

  ngOnInit(): void {
    const companyId = this.getCompanyIdFromSession(); // Obtener el ID del usuario logueado (cambia esta lógica según tu implementación)
    if (companyId) {
      this.loadCompanyProfile(companyId);
    }
  }

  private getCompanyIdFromSession(): number {
    // Reemplaza esto con la lógica real para obtener el ID del usuario actual
    return 1; // Ejemplo estático
  }

  private loadCompanyProfile(companyId: number): void {
    this.companiesService.getCompanyProfile(companyId).subscribe((response) => {
      if (response.status === 'SUCCESS' && response.data) {
        this.company = response.data;
      } else {
        console.error('Error al cargar perfil de la compañía:', response.message);
      }
    });
  }
}
