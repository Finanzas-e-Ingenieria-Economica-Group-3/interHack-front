import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { JwtRequest } from '../../models/JwtRequest';
import {RegisterRequestDto} from "../../models/RegisterRequestDto";
import {RegisterService} from "../../services/register.service";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  isSignUpVisible: boolean = false; // Nueva propiedad para controlar la visibilidad del signup

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private registerService: RegisterService
  ) {}

  //login
  username: string = '';
  password: string = '';
  mensaje: string = '';

  //register
  rname: string = '';
  rruc: string = '';
  remail: string = '';
  rpassword: string = '';

  ngOnInit(): void {}

  // Alterna entre el formulario de inicio de sesión y registro
  toggleForm() {
    this.isSignUpVisible = !this.isSignUpVisible;
  }

  // Método de inicio de sesión
  login() {
    const request = new JwtRequest();
    request.email = this.username;
    request.password = this.password;

    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.data.token);
        this.loginService.getCompanyByEmail(request.email).subscribe(
          (data: any) => {
            localStorage.setItem('companyId', data.data.companyId.toString());
          });
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }

  // Método de registro
  singUp() {
    const create = new RegisterRequestDto();
    create.email = this.remail;
    create.name = this.rname;
    create.password = this.rpassword;
    create.ruc = this.rruc;

    this.registerService.register(create).subscribe(
      (data: any) => {
        // Verifica si el ID de la compañía está en la respuesta y lo almacena en localStorage
        if (data && data.data && data.data.companyId) {
          this.snackBar.open('Usuario creado con éxito', 'Aviso', { duration: 2000 });
          this.toggleForm(); // Cambia al formulario de login después de registro exitoso
        } else {
          this.snackBar.open('Error: La respuesta no contiene el ID de la compañía', 'Aviso', { duration: 2000 });
        }
      },
      (error) => {
        this.snackBar.open('Error al crear el usuario', 'Aviso', { duration: 2000 });
      }
    );
  }
}
