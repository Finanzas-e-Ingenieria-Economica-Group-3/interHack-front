import { Invoice } from './invoice';
import { Bank } from './bank.model';

export class Report {
  reportId: number = 0;
  discount: number = 0; // Descuento calculado
  netAmount: number = 0; // Valor neto de la factura
  tcea: number = 0; // Tasa efectiva anual
  invoice: Invoice = new Invoice(); // Relación con una factura
  bank: Bank = new Bank(); // Relación con un banco
}
