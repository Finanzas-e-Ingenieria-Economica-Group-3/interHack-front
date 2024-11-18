import { Rate } from './rate.model';

export class Bank {
  bankId: number = 0;
  name: string = "";
  imageUrl: string = "";
  ruc: string = "";
  rate: Rate = new Rate(); // Instancia de Rate para asociar el tipo de tasa
}
