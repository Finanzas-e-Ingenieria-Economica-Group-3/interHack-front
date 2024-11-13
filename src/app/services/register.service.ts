import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtRequest} from "../models/JwtRequest";
import {RegisterRequestDto} from "../models/RegisterRequestDto";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {}

  register(request: RegisterRequestDto) {
    return this.http.post('http://localhost:8080/api/v1/auth/register', request);
  }

}
