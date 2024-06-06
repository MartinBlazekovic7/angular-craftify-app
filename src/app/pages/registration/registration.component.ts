import { userService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  UntypedFormBuilder,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule],
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

  constructor(
    private fb: UntypedFormBuilder,
    private userService: userService
  ) {}

  onSubmit() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.userService.createUser(this.registerForm.value).subscribe({
      next: () => {
        alert('User created successfully!');
        this.registerForm.reset();
      },
      error: () => {
        alert('User creation failed. Please try again.');
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
