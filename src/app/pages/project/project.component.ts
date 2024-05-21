import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsComponent } from '../../components/comments/comments.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommentsComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit, OnDestroy {
  subscription?: Subscription;

  project?: Project;

  projectId?: number;

  inFavorites = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjectId();
    this.getProject();
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

  likeProject(): void {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
