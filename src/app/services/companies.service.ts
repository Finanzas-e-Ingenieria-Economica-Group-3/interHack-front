import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company';
import { ApiResponse } from '../models/ApiReponse';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})

export class CompaniesService {
  private url = `${base_url}/api/v1/companies`;

  constructor(private httpClient: HttpClient) {}

  // Método para obtener el perfil de la compañía por su ID
  getCompanyProfile(companyId: number) {
    return this.httpClient.get<ApiResponse<Company>>(`${this.url}/profile/${companyId}`);
  }

  // Método para eliminar la compañía (requiere permisos de administrador)
  deleteCompany(companyId: number) {
    return this.httpClient.delete<ApiResponse<Object>>(`${this.url}/delete/${companyId}`);
  }
}
