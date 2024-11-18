import { Invoice } from './invoice';
import { Bank } from './bank.model';

export class Report {
  reportId: number = 0;
  discount: number = 0;
  netAmount: number = 0;
  tcea: number = 0;
  invoiceId: number = 0;
  bankId: number = 0;
  bank: Bank = new Bank(); // Relación con un banco
}
