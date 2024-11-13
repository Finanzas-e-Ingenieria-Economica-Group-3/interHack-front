import { Role } from './Role';

export class AuthenticatedUser {
  companyId: number = 0;
  email: string = '';
  name: string = '';
  roles: Role[] = [];  // Los roles del usuario autenticado
}
