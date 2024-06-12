import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsComponent } from '../../components/comments/comments.component';
import { AuthenticationService } from '../../services/authentication.service';
import { UserProfile } from '../../models/user-profile.interface';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommentsComponent, CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit, OnDestroy {
  subscription?: Subscription;

  project?: Project;

  projectId?: number;

  inFavorites = false;

  isUserLoggedIn = false;

  favorites: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getProjectId();
    this.getProject();
    this.getUserLoggedIn();
  }

  getUserLoggedIn(): void {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();

    if (this.isUserLoggedIn) {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const user: UserProfile = JSON.parse(userJson);
        const userId = user.id!;

        this.userService.getFavorites(userId).subscribe({
          next: (favorites: Project[]) => {
            this.favorites = favorites;
            this.inFavorites = this.favorites.some(
              (favorite) => favorite.id == this.projectId
            );
          },
          error: () => {
            console.log('error');
          },
        });
      }
    }
  }

  getProjectId(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.projectId = params['id'];
    });
  }

  getProject(): void {
    if (!this.projectId) {
      return;
    }

    this.subscription = this.projectService
      .getProjectById(this.projectId)
      .subscribe({
        next: (project: Project) => {
          this.project = project;
        },
        error: () => {
          this.router.navigate(['/']);
        },
      });
  }

  addRemoveFavorite(): void {
    this.userService
      .addFavorite(
        this.projectId!,
        this.projectId!,
        this.inFavorites ? 'removeFavorite' : 'addFavorite'
      )
      .subscribe({
        next: () => {
          this.inFavorites = !this.inFavorites;
        },
        error: () => {
          console.log('error');
        },
      });
  }

  likeProject(): void {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
