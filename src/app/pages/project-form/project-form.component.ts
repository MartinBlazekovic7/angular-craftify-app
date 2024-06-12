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

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent implements OnInit {
  title = '';
  projectForm!: FormGroup;
  isSubmit = true;
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
    private userService: UserService
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
    if (this.projectForm.valid) {
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

      console.log(project);

      this.projectService.submitProject(project).subscribe((response) => {
        console.log(response);
      });
    }
  }
}
