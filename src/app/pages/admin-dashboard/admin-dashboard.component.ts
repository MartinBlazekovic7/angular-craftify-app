import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Items } from '../../enums/items.enum';
import { ProjectService } from '../../services/project.service';
import { TutorialService } from '../../services/tutorial.service';
import { NewsDetailService } from '../../services/newsDetail.service';
import { Project, ProjectDTO } from '../../models/project.interface';
import { UserProfile } from '../../models/user-profile.interface';
import { Tutorial, TutorialDTO } from '../../models/tutorial.interface';
import { NewsDTO, NewsDetail } from '../../models/newsDetail.interface';
import { Category } from '../../models/category.interface';
import { CategoryService } from '../../services/category.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  readonly items = Items;

  selectedItem: string = '';

  projects: Project[] = [];
  news: NewsDetail[] = [];
  tutorials: Tutorial[] = [];
  users: UserProfile[] = [];
  categories: Category[] = [];

  selectedProject: Project | null = null;
  selectedNews: NewsDetail | null = null;
  selectedTutorial: Tutorial | null = null;
  selectedUser: UserProfile | null = null;
  selectedCategory: Category | null = null;

  toggleModalProjectView = false;
  toggleModalNewsView = false;
  toggleModalTutorialView = false;
  toggleModalUserView = false;
  toggleModalCategoryView = false;

  toggleModalProjectEdit = false;
  toggleModalNewsEdit = false;
  toggleModalTutorialEdit = false;
  toggleModalUserEdit = false;
  toggleModalCategoryEdit = false;

  projectEditForm = this.fb.group({
    title: [''],
    description: [''],
    content: [''],
  });

  newsEditForm = this.fb.group({
    title: [''],
    content: [''],
  });

  tutorialEditForm = this.fb.group({
    title: [''],
    content: [''],
  });

  userEditForm = this.fb.group({
    username: [''],
    email: [''],
    name: [''],
  });

  categoryEditForm = this.fb.group({
    name: [''],
  });

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private tutorialService: TutorialService,
    private newsService: NewsDetailService,
    private categoryService: CategoryService,
    private fb: UntypedFormBuilder
  ) {}

  getItems(item: Items) {
    this.selectedItem = item;
    console.log('Selected Item:', item);
    if (item === 'projects') {
      this.projectService.getAllProjects().subscribe((projects) => {
        this.projects = projects;
      });
    }
    if (item === 'tutorials') {
      this.tutorialService.getAllTutorials().subscribe((tutorials) => {
        this.tutorials = tutorials;
      });
    }
    if (item === 'news') {
      this.newsService.getAllNews().subscribe((news) => {
        this.news = news;
      });
    }
    if (item === 'users') {
      this.userService.getAllUsers().subscribe((users) => {
        this.users = users;
      });
    }
    if (item === 'categories') {
      this.categoryService.getAllCategories().subscribe((categories) => {
        this.categories = categories;
      });
    }
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter((project) => project.id !== id);
    });
  }

  openProjectDetails(project: Project) {
    this.selectedProject = project;
    this.toggleModalProjectView = true;
  }

  openEditProject(project: Project) {
    this.selectedProject = project;
    this.toggleModalProjectEdit = true;
    this.projectEditForm.patchValue({
      title: project.title,
      description: project.description,
      content: project.content,
    });
  }

  onEditProject() {
    if (!this.projectEditForm.valid) {
      this.projectEditForm.markAllAsTouched();
      return;
    }

    const updatedProject: ProjectDTO = {
      id: this.selectedProject!.id,
      title: this.projectEditForm.value.title,
      description: this.projectEditForm.value.description,
      content: this.projectEditForm.value.content,
      categoryId: this.selectedProject!.category.id,
      complexityId: this.selectedProject!.complexity.id,
      mediaList: this.selectedProject!.mediaList,
    };

    this.projectService.editProject(updatedProject).subscribe(() => {
      this.toggleModalProjectEdit = false;
      this.projectEditForm.reset();
      const project: Project = {
        ...this.selectedProject!,
        title: updatedProject.title,
        description: updatedProject.description,
        content: updatedProject.content,
      };
      this.projects = this.projects.map((p) =>
        p.id === project.id ? project : p
      );
    });
  }

  openNewsDetails(news: NewsDetail) {
    this.selectedNews = news;
    this.toggleModalNewsView = true;
  }

  openEditNews(news: NewsDetail) {
    this.selectedNews = news;
    this.toggleModalNewsEdit = true;
    this.newsEditForm.patchValue({
      title: news.title,
      content: news.content,
    });
  }

  onEditNews() {
    console.log('Edit News');
    if (!this.newsEditForm.valid) {
      this.newsEditForm.markAllAsTouched();
      return;
    }

    const updatedNews: NewsDTO = {
      id: this.selectedNews!.id,
      title: this.newsEditForm.value.title,
      content: this.newsEditForm.value.content,
      categoryDTO: { id: 1, name: 'News' },
      imageUrl: this.selectedNews!.imageUrl!,
    };

    this.newsService.editNews(updatedNews).subscribe(() => {
      this.toggleModalNewsEdit = false;
      this.newsEditForm.reset();
      const news: NewsDetail = {
        ...this.selectedNews!,
        title: updatedNews.title,
        content: updatedNews.content,
      };
      this.news = this.news.map((n) => (n.id === news.id ? news : n));
    });
  }

  openTutorialDetails(tutorial: Tutorial) {
    this.selectedTutorial = tutorial;
    this.toggleModalTutorialView = true;
  }

  openEditTutorial(tutorial: Tutorial) {
    this.selectedTutorial = tutorial;
    this.toggleModalTutorialEdit = true;
    this.tutorialEditForm.patchValue({
      title: tutorial.title,
      content: tutorial.content,
    });
  }

  onEditTutorial() {
    if (!this.tutorialEditForm.valid) {
      this.tutorialEditForm.markAllAsTouched();
      return;
    }

    const updatedTutorial: TutorialDTO = {
      id: this.selectedTutorial!.id,
      title: this.tutorialEditForm.value.title,
      content: this.tutorialEditForm.value.content,
      categoryId: this.selectedTutorial!.category.id,
      complexityId: this.selectedTutorial!.complexity.id,
    };

    this.tutorialService.editTutorial(updatedTutorial).subscribe(() => {
      this.toggleModalTutorialEdit = false;
      this.tutorialEditForm.reset();
      const tutorial: Tutorial = {
        ...this.selectedTutorial!,
        title: updatedTutorial.title,
        content: updatedTutorial.content,
      };
      this.tutorials = this.tutorials.map((t) =>
        t.id === tutorial.id ? tutorial : t
      );
    });
  }

  openUserDetails(user: UserProfile) {
    this.selectedUser = user;
    this.toggleModalUserView = true;
  }

  openEditUser(user: UserProfile) {
    this.selectedUser = user;
    this.toggleModalUserEdit = true;
    this.userEditForm.patchValue({
      username: user.username,
      name: user.name,
      email: user.email,
    });
  }

  onEditUser() {
    if (!this.userEditForm.valid) {
      this.userEditForm.markAllAsTouched();
      return;
    }

    const updatedUser: UserProfile = {
      id: this.selectedUser!.id,
      username: this.userEditForm.value.username,
      email: this.userEditForm.value.email,
      name: this.userEditForm.value.name,
    };

    this.userService.updateUser(updatedUser.id!).subscribe(() => {
      this.toggleModalUserEdit = false;
      this.userEditForm.reset();
    });
  }

  openCategoryDetails(category: Category) {
    this.selectedCategory = category;
    this.toggleModalCategoryView = true;
  }

  openEditCategory(category: Category) {
    this.selectedCategory = category;
    this.toggleModalCategoryEdit = true;
    this.categoryEditForm.patchValue({
      name: category.name,
    });
  }

  onEditCategory() {
    if (!this.categoryEditForm.valid) {
      this.categoryEditForm.markAllAsTouched();
      return;
    }

    const updatedCategory: Category = {
      id: this.selectedCategory!.id,
      name: this.categoryEditForm.value.name,
    };

    this.categoryService.editCategory(updatedCategory).subscribe(() => {
      this.toggleModalCategoryEdit = false;
      this.categoryEditForm.reset();
    });
  }

  deleteTutorial(id: number) {
    this.tutorialService.deleteTutorial(id).subscribe(() => {
      this.tutorials = this.tutorials.filter((tutorial) => tutorial.id !== id);
    });
  }

  deleteNews(id: number) {
    this.newsService.deleteNews(id).subscribe(() => {
      this.news = this.news.filter((news) => news.id !== id);
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(
        (category) => category.id !== id
      );
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== id);
    });
  }
}
