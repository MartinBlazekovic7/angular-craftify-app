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

  constructor(private fb: UntypedFormBuilder) {}

  onSubmit() {
    alert(
      `Email: ${this.registerForm.value.email} Name: ${this.registerForm.value.name} Username: ${this.registerForm.value.username} Password: ${this.registerForm.value.password} Confirm Password: ${this.registerForm.value.confirmPassword}`
    );
  }
}
