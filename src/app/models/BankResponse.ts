import { RateResponse } from './RateResponse';

export class BankResponse {
  bankId: number = 0;
  name: string = '';
  imageUrl: string = '';
  ruc: string = '';
  rate: RateResponse = new RateResponse(); // Relación con RateResponse
}
