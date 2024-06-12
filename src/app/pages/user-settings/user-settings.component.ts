/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
})
export class UserSettingsComponent implements OnInit {
  profileForm!: FormGroup;
  userId!: number;
  subscription?: Subscription;
  name: any;
  userName: any;
  email: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      userName: [
        '',
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(28),
      ],
      email: ['', Validators.required, Validators.email],
    });
  }

  onSubmit() {
    if (this.profileForm?.valid) {
      console.log('Form submitted', this.profileForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
