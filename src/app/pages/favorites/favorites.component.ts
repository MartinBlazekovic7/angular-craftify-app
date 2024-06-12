import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../models/user-profile.interface';
import { UserService } from '../../services/user.service';
import { Project } from '../../models/project.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  userId!: number;
  favorites: Project[] = [];

  constructor(private userService: UserService) {}

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
}
