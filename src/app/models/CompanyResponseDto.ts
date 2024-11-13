import { Role } from "./Role";

export class CompanyResponseDto {
  companyId: number = 0;
  name: string = '';
  ruc: string = '';
  email: string = '';
  roles: Role[] = [];
}
