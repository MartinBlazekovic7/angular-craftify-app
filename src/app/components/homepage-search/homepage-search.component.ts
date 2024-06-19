import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Subscription } from 'rxjs';
import { Project } from '../../models/project.interface';

@Component({
  selector: 'app-homepage-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './homepage-search.component.html',
  styleUrl: './homepage-search.component.scss',
})
export class HomepageSearchComponent implements OnDestroy {
  searchTerm = '';

  subscription?: Subscription;

  projects?: Project[] = [];

  searchedProjects?: boolean = false;

  constructor(private projectService: ProjectService) {}

  searchProjects() {
    this.subscription = this.projectService
      .getFilteredProjets({ nameOrUser: this.searchTerm })
      .subscribe({
        next: (projects) => {
          this.searchedProjects = true;
          if (!projects) {
            this.projects = [];
            return;
          }
          this.projects = projects;
        },
        error: () => {
          console.log('error');
        },
      });
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchedProjects = false;
    this.projects = [];
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
