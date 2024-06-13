import { FormsModule } from '@angular/forms';
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
import { CommentDTO } from '../../models/comment.interface';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommentsComponent, CommonModule, FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit, OnDestroy {
  subscription?: Subscription;

  project?: Project;

  projectId?: number;

  inFavorites = false;

  liked = false;

  isUserLoggedIn = false;

  favorites: Project[] = [];

  newComment: string = '';

  userId: number = 0;

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
            this.liked =
              this.project?.userLikes.some((user) => user.id == userId) ??
              false;
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
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: UserProfile = JSON.parse(userJson);
      this.userId = user.id!;
    }

    if (this.inFavorites) {
      this.userService.removeFavorite(this.userId!, this.projectId!).subscribe({
        next: () => {
          this.inFavorites = !this.inFavorites;
        },
        error: () => {
          console.log('error');
        },
      });
    } else {
      this.userService.addFavorite(this.userId!, this.projectId!).subscribe({
        next: () => {
          this.inFavorites = !this.inFavorites;
        },
        error: () => {
          console.log('error');
        },
      });
    }
  }

  addRemoveLike(): void {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return;
    }

    const user: UserProfile = JSON.parse(userJson);

    if (this.liked) {
      this.userService.removeLike(user.id!, this.projectId!).subscribe({
        next: () => {
          this.liked = !this.liked;
          this.project!.userLikes = this.project!.userLikes.filter(
            (user) => user.id !== user.id
          );
        },
        error: () => {
          console.log('error');
        },
      });
    } else {
      this.userService.addLike(user.id!, this.projectId!).subscribe({
        next: () => {
          this.liked = !this.liked;
          this.project!.userLikes.push(user);
        },
        error: () => {
          console.log('error');
        },
      });
    }
  }

  addComment(): void {
    if (!this.newComment) {
      return;
    }

    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return;
    }

    const user: UserProfile = JSON.parse(userJson);
    const userId = user.id!;

    const commentDTO: CommentDTO = {
      comment: this.newComment,
      projectId: Number(this.projectId!),
      userId: userId,
    };

    this.projectService.addComment(commentDTO).subscribe({
      next: () => {
        this.project!.comments.push({
          comment: this.newComment,
          user: user,
          commentTime: new Date().toISOString(),
        });
        this.newComment = '';
        this.getProject();
      },
      error: () => {
        console.log('error');
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
