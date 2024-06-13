import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Category } from '../../models/category.interface';
import { Complexity } from '../../models/complexity.interface';
import { ProjectForm } from '../../models/project.interface';
import { UserProfile } from '../../models/user-profile.interface';
import { UserService } from '../../services/user.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, ToastModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
  providers: [MessageService],
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  submitMessage = '';
  categoryTags: Category[] = [
    { id: 1, name: 'Home Decor' },
    { id: 2, name: 'Upcycling/Recycling' },
    { id: 3, name: 'Sewing and Fabric Crafts' },
    { id: 4, name: 'Woodworking' },
    { id: 5, name: 'Paper Crafts' },
    { id: 6, name: 'Jewelry Making' },
    { id: 7, name: 'Outdoor/Garden Crafts' },
    { id: 8, name: 'Holiday and Seasonal Crafts' },
    { id: 9, name: 'Kids Crafts' },
  ];

  complexityTags: Complexity[] = [
    { id: 1, name: 'Beginner' },
    { id: 2, name: 'Intermediate' },
    { id: 3, name: 'Advanced' },
    { id: 4, name: 'Expert' },
  ];

  userId: number = 0;

  user: UserProfile | undefined;

  constructor(
    private projectBuilder: FormBuilder,
    private projectService: ProjectService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.projectBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      complexity: ['', Validators.required],
      category: ['', Validators.required],
    });

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
  }

  onSubmit() {
    if (!this.projectForm.valid) {
      this.projectForm.markAllAsTouched();
      return;
    }
    const project: ProjectForm = {
      title: this.projectForm.value.title,
      description: this.projectForm.value.description,
      content: this.projectForm.value.content,
      categoryId: this.projectForm.value.category,
      complexityId: this.projectForm.value.complexity,
      userId: this.userId,
      mediaList: [],
      commentIdList: [],
      userLikesIdList: [],
      favoriteProjectUserIdList: [],
      projectFollowersIdList: [],
    };

    this.projectService.submitProject(project).subscribe({
      next: () => {
        this.projectForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully created project.',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'danger',
          summary: 'Error',
          detail: 'Error creating project. Please try again.',
        });
      },
    });
  }

  get title() {
    return this.projectForm.get('title');
  }

  get description() {
    return this.projectForm.get('description');
  }

  get content() {
    return this.projectForm.get('content');
  }

  get category() {
    return this.projectForm.get('category');
  }

  get complexity() {
    return this.projectForm.get('complexity');
  }
}
