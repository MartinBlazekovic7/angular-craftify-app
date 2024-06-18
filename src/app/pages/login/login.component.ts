import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { LoginDto } from '../../models/login-dto.interface';
import { AuthenticationService } from '../../services/authentication.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, DialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  dialogToggle = false;
  successfulLogin = false;
  dialogMessage = '';

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthenticationService
  ) {}

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData: LoginDto = {
      usernameOrEmail: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(loginData).subscribe({
      next: () => {
        this.dialogToggle = true;
        this.successfulLogin = true;
        this.dialogMessage = 'Login successful!';
        this.loginForm.reset();
      },
      error: () => {
        this.dialogToggle = true;
        this.successfulLogin = false;
        this.dialogMessage = 'Login failed. Please try again.';
      },
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
