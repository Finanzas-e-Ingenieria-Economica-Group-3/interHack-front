import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Observable, Subject } from 'rxjs';
import { Bank } from '../models/bank.model';
import { ApiResponse } from '../models/ApiReponse';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class BankService {
  private url = `${base_url}/api/v1/banks`;
  private listaCambio = new Subject<Bank[]>();

  constructor(private httpClient: HttpClient) {}

  // Método para obtener todos los bancos
  getBanks() {
    this.httpClient.get<ApiResponse<Bank[]>>(this.url).subscribe(response => {
      this.listaCambio.next(response.data || []);
    });
  }

  // Método para obtener un banco por su ID
  getBankById(id: number) {
    return this.httpClient.get<ApiResponse<Bank>>(`${this.url}/${id}`);
  }

  // Métodos para manejar la lista de bancos en tiempo real
  setList(listaNueva: Bank[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
