import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Subscription } from 'rxjs';
import { Project } from '../../models/project.interface';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage-slider',
  standalone: true,
  imports: [CarouselModule, RouterModule],
  templateUrl: './homepage-slider.component.html',
  styleUrl: './homepage-slider.component.scss',
})
export class HomepageSliderComponent implements OnInit, OnDestroy {
  subscription?: Subscription;

  projects?: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.subscription = this.projectService.getAllProjects().subscribe({
      next: (projects: Project[]) => {
        this.projects = projects;
        console.log(this.projects);
      },
      error: () => {
        this.projects = [];
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
