import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../models/user-profile.interface';
import { UserService } from '../../services/user.service';
import { Project } from '../../models/project.interface';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule, 
    ToastModule,
    TranslateModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  providers: [MessageService],
})
export class FavoritesComponent implements OnInit {
  userId!: number;
  favorites: Project[] = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: UserProfile = JSON.parse(userJson);
      this.userId = user.id!;

      this.userService.getFavorites(this.userId).subscribe({
        next: (favorites: Project[]) => {
          this.favorites = favorites;
        },
        error: () => {
          console.log('error');
        },
      });
    }
  }

  removeFavorite(id: number): void {
    this.userService.removeFavorite(this.userId, id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully updated user profile.',
        });
        this.favorites = this.favorites.filter(
          (favorite) => favorite.id !== id
        );
      },
      error: () => {
        this.messageService.add({
          severity: 'danger',
          summary: 'Error',
          detail: 'Failed to update user profile.',
        });
        console.log('error');
      },
    });
  }
}
