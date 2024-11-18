// models/api-response.model.ts
export class ApiResponse<T> {
    message: string = '';
    status: string = '';
    data: T | null = null;
  }
  