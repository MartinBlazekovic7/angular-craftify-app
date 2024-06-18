import { UserService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  UntypedFormBuilder,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UserDTO } from '../../models/tokens.interface';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, DialogModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  passwordsDoNotMatch = false;

  dialogToggle = false;
  successfulRegistration = false;
  dialogMessage = '';

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService
  ) {}

  onSubmit() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      this.passwordsDoNotMatch = true;
      return;
    }

    const userDTO: UserDTO = {
      email: this.registerForm.value.email,
      name: this.registerForm.value.name,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      isAdmin: false,
      isPrivate: false,
      userPreferences: [],
    };

    this.userService.createUser(userDTO).subscribe({
      next: () => {
        this.dialogToggle = true;
        this.successfulRegistration = true;
        this.dialogMessage = 'Registration successful!';
        this.registerForm.reset();
      },
      error: () => {
        this.dialogToggle = true;
        this.successfulRegistration = false;
        this.dialogMessage = 'Registration failed. Please try again.';
      },
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
