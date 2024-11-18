import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/clients';
import { ApiResponse } from '../models/ApiReponse';
import { Observable } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private url = `${base_url}/api/v1/clients`;

  constructor(private httpClient: HttpClient) {}

  getAllClients() {
    return this.httpClient.get<ApiResponse<Client[]>>(`${this.url}`);
  }

  getClientById(clientId: number) {
    return this.httpClient.get<ApiResponse<{ data: Client }>>(`${this.url}/${clientId}`);
  }

  createClient(companyId: number, client: Client) {
    return this.httpClient.post<ApiResponse<Client>>(`${base_url}/api/v1/companies/${companyId}/clients`, client);
  }
  

  updateClient(clientId: number, client: Client) {
    return this.httpClient.put<ApiResponse<Client>>(`${this.url}/${clientId}`, client);
  }

  deleteClient(clientId: number) {
    return this.httpClient.delete<ApiResponse<Client>>(`${this.url}/${clientId}`);
  }
}
