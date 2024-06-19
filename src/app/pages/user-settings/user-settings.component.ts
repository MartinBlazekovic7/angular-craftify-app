/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../models/user-profile.interface';
import { UserDTO } from '../../models/tokens.interface';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LanguageService } from '../../services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserActions } from '../../interface/user.action.interface';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastModule, TranslateModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
  providers: [MessageService, TranslateService],
})
export class UserSettingsComponent implements OnInit {
  userEditForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    name: ['', Validators.required],
  });

  user: UserProfile | undefined;
  userId!: number;
  selectedLanguage: string = 'hr';

  constructor(
    private fb: UntypedFormBuilder,
    @Inject(UserService) private userService: UserActions,
    private messageService: MessageService,
    private languageService: LanguageService,
    public translateService: TranslateService
  ) {
    this.languageService.initLanguage();
    this.selectedLanguage = this.languageService.getCurrentLanguage();
  }

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
    if (!this.userEditForm.valid) {
      this.userEditForm.markAllAsTouched();
      return;
    }

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
          detail: 'Error updating user profile. Please try again.',
        });
      },
    });
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
    this.selectedLanguage = language;
    console.log('Language changed to: ', language);
  }

  get username() {
    return this.userEditForm.get('username');
  }

  get email() {
    return this.userEditForm.get('email');
  }

  get name() {
    return this.userEditForm.get('name');
  }
}
