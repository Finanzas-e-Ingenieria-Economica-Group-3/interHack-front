import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/ApiReponse';
import { Observable, Subject } from 'rxjs';
import { Invoice } from '../models/invoice';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private url = `${base_url}/api/v1/invoices`;
  private listaCambio = new Subject<Invoice[]>();

  constructor(private httpClient: HttpClient) {}

  // Obtener todas las facturas
  getInvoices(): Observable<ApiResponse<Invoice[]>> {
    return this.httpClient.get<ApiResponse<Invoice[]>>(this.url);
  }
  getInvoicesByCompanyIdAndByClientId(companyId: string, clientId: string): Observable<ApiResponse<Invoice[]>> {
    return this.httpClient.get<ApiResponse<Invoice[]>>(`http://localhost:8080/api/v1/companies/${companyId}/clients/${clientId}/invoices`);
  }

  // Obtener factura por ID
  getInvoiceById(invoiceId: string): Observable<ApiResponse<Invoice>> {
    return this.httpClient.get<ApiResponse<Invoice>>(`${this.url}/${invoiceId}`);
  }

  // Crear nueva factura
  createInvoice(invoice: Invoice): Observable<ApiResponse<Invoice>> {
    return this.httpClient.post<ApiResponse<Invoice>>(this.url, invoice);
  }

  // Obtener facturas por ID de empresa
  getInvoicesByCompanyId(companyId: number): Observable<ApiResponse<Invoice[]>> {
    return this.httpClient.get<ApiResponse<Invoice[]>>(
      `${base_url}/api/v1/companies/${companyId}/invoices`
    );
  }

  // Método para emitir lista actualizada
  setList(listaNueva: Invoice[]): void {
    this.listaCambio.next(listaNueva);
  }

  // Método para observar lista actualizada
  getList(): Observable<Invoice[]> {
    return this.listaCambio.asObservable();
  }
}
