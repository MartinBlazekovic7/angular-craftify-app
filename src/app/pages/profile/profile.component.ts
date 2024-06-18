/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Comment } from '../../models/comment.interface';
import { Project } from '../../models/project.interface';
import { UserProfile } from '../../models/user-profile.interface';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ToastModule, TranslateModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  user: UserProfile | undefined;
  projects: Project[] = [];
  likes: Project[] = [];
  comments: Comment[] = [];
  userId!: number;
  isOwnProfile: boolean = false;
  categoryId!: number;
  showCommentsLikes: any;
  subscription?: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthenticationService,
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
        },
        error: () => {
          this.user;
        },
      });
    }

    this.loadUserComments();
    this.loadUserLikes();
    this.loadUserProjects();
  }

  loadUserComments(): void {
    this.subscription = this.userService
      .getUserComments(this.userId)
      .subscribe({
        next: (commnets: Comment[]) => {
          this.comments = commnets;
          console.log(this.comments);
        },
        error: () => {
          this.comments;
        },
      });
  }

  loadUserLikes(): void {
    this.subscription = this.userService.getUserLikes(this.userId).subscribe({
      next: (likes: Project[]) => {
        this.likes = likes;
        console.log(this.likes);
      },
      error: () => {
        this.likes;
      },
    });
  }

  loadUserProjects(): void {
    this.subscription = this.userService
      .getUserProjects(this.userId)
      .subscribe({
        next: (projects: Project[]) => {
          this.projects = projects;
          console.log(this.projects);
        },
        error: () => {
          this.projects;
        },
      });
  }

  navigateToCreateProject(): void {
    this.router.navigate(['/create-project']);
  }

  removeCategory(categoryId: number): void {
    this.userService
      .removeUserCategory(this.userId, categoryId)
      .subscribe((response) => {
        console.log('category removed', response);
      });
  }

  removeLike(projectId: number): void {
    this.userService.removeLike(this.userId, projectId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully removed like.',
        });
        this.loadUserLikes();
      },
      error: () => {
        this.messageService.add({
          severity: 'danger',
          summary: 'Error',
          detail: 'Failed to remove like.',
        });
        console.log('error');
      },
    });
  }

  removeComment(commentId: number): void {
    this.userService.removeComment(commentId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully removed comment.',
        });
        this.loadUserComments();
      },
      error: () => {
        this.messageService.add({
          severity: 'danger',
          summary: 'Error',
          detail: 'Failed to remove comment.',
        });
        console.log('error');
      },
    });
  }
}
