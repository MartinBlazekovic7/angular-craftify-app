/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../models/user-profile.interface';
import { UserDTO } from '../../models/tokens.interface';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
  providers: [MessageService],
})
export class UserSettingsComponent implements OnInit {
  userEditForm = this.fb.group({
    username: [''],
    email: [''],
    name: [''],
  });

  user: UserProfile | undefined;
  userId!: number;

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: UserProfile = JSON.parse(userJson);
      this.userId = user.id!;

      this.userService.getUserProfile(this.userId).subscribe({
        next: (user: UserProfile) => {
          this.user = user;
          this.userEditForm.patchValue({
            username: user.username,
            email: user.email,
            name: user.name,
          });
        },
        error: () => {
          this.user;
        },
      });
    }
  }

  onSubmit() {
    if (this.userEditForm.valid) {
      const userDTO: UserDTO = {
        id: this.userId,
        username: this.userEditForm.value.username,
        email: this.userEditForm.value.email,
        name: this.userEditForm.value.name,
        password: 'newPassword123',
        isAdmin: false,
        isPrivate: false,
        userPreferences: [],
      };

      this.userService.editUser(userDTO).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Successfully updated user profile.',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'danger',
            summary: 'Error',
            detail: 'Successfully updated user profile.',
          });
        },
      });
    }
  }

  changeLanguage(language: string) {
    console.log(`Language changed to ${language}`);
  }
}
