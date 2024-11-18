import { Company } from "./company";

export class Client {
  clientId: number = 0;
  name: string = '';
  lastname: string = '';
  email: string = '';
  dni: string = '';
  company: Company = new Company(); // Instancia de Company para asociar la compañía con el cliente
}
