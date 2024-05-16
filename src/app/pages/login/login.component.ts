import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: UntypedFormBuilder) {}

  onSubmit() {
    alert(
      `Email: ${this.loginForm.value.email} Password: ${this.loginForm.value.password}`
    );
  }
}
