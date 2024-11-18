import { Client } from './clients';
import { Company } from './company';
import { Report } from './report'; // Importa la clase de Report si es necesario

export class Invoice {
  companyId: number = 0; // ID único de la factura
  client: Client = new Client(); // Relación inicializada con un cliente por defecto
  company: Company = new Company(); // Relación inicializada con una empresa por defecto
  amount: number = 0; // Monto de la factura
  currencyType: 'PEN' | 'USD' = 'PEN'; // Moneda de la factura
  issueDate: Date = new Date(); // Fecha de emisión de la factura
  dueDate: Date = new Date(); // Fecha de vencimiento
  report: Report = new Report(); // Relación con un reporte inicializado
}
