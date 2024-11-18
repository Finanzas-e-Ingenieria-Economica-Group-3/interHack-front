import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtRequest} from "../models/JwtRequest";
import {RegisterRequestDto} from "../models/RegisterRequestDto";
import { ApiResponse } from '../models/ApiReponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url = 'http://localhost:8080/api/v1/auth/register';

  constructor(private http: HttpClient) {}

  register(request: RegisterRequestDto): Observable<ApiResponse<RegisterRequestDto>> {
    return this.http.post<ApiResponse<RegisterRequestDto>>(this.url, request);
  }

}
