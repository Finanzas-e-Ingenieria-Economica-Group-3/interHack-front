import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/ApiReponse';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private url = `${base_url}/api/v1/reports`;

  constructor(private http: HttpClient) {}

  getReports(): Observable<ApiResponse<Report[]>> {
    return this.http.get<ApiResponse<Report[]>>(this.url);
  }

  getReportByInvoiceId(invoiceId: number): Observable<ApiResponse<Report>> {
    console.log(`${this.url}/invoices/${invoiceId}`);
    return this.http.get<ApiResponse<Report>>(`${this.url}/invoices/${invoiceId}`);

  }


  createReport(invoiceId: number, bankId: number): Observable<ApiResponse<Report>> {
    return this.http.post<ApiResponse<Report>>(`http://localhost:8080/api/v1/invoices/${invoiceId}/banks/${bankId}/reports`, {});
  }

  updateReport(reportId: number, invoiceId: number, bankId: number, payload: Partial<Report>): Observable<ApiResponse<Report>> {
    return this.http.put<ApiResponse<Report>>(
      `${this.url}/${reportId}/invoices/${invoiceId}/banks/${bankId}`,
      payload
    );
  }

  deleteReport(reportId: number): Observable<ApiResponse<Report>> {
    return this.http.delete<ApiResponse<Report>>(`${this.url}/${reportId}`);
  }
}
