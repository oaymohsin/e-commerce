import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'e-commerce-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginFormGroup: FormGroup | any;
  isSubmitted = false;
  authError = false;
  authMessage='Email or Password are wrong'

  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.loginForm.email.value, this.loginForm.password.value)
      .subscribe((response: any) => {
        this.authError = false;
        this.localStorageService.setToken(response.token);
        this.router.navigate(['/']);
      },
      (error:HttpErrorResponse)=>{
        this.authError=true;
        if(error.status!=400){
          this.authMessage="Error in the Server, please try again later!"
        }
      }
      );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
