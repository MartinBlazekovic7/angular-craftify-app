import { Routes } from '@angular/router';
import { AuthGuard } from './utils/auth.guard';
import { AdminGuard } from './utils/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'news',
    loadComponent: () =>
      import('./pages/news/news.component').then((m) => m.NewsComponent),
  },
  {
    path: 'tutorials',
    loadComponent: () =>
      import('./pages/tutorials/tutorials.component').then(
        (m) => m.TutorialsComponent
      ),
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'registration',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/registration/registration.component').then(
        (m) => m.RegistrationComponent
      ),
  },
  {
    path: 'favorites',
    canActivate: [!AuthGuard],
    loadComponent: () =>
      import('./pages/favorites/favorites.component').then(
        (m) => m.FavoritesComponent
      ),
  },
  {
    path: 'settings',
    canActivate: [!AuthGuard],
    loadComponent: () =>
      import('./pages/settings/settings.component').then(
        (m) => m.SettingsComponent
      ),
  },
  {
    path: 'settings',
    canActivate: [!AuthGuard],
    loadComponent: () =>
      import('./pages/settings/settings.component').then(
        (m) => m.SettingsComponent
      ),
  },
  {
    path: 'admin-dashboard',
    canActivate: [AdminGuard],
    loadComponent: () =>
      import('./pages/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: 'user-settings',
    loadComponent: () =>
      import('./pages/user-settings/user-settings.component').then(
        (m) => m.UserSettingsComponent
      ),
  },
  {
    path: 'project/:id',
    loadComponent: () =>
      import('./pages/project/project.component').then(
        (m) => m.ProjectComponent
      ),
  },
  {
    path: 'tutorial/:id',
    loadComponent: () =>
      import('./pages/tutorial/tutorial.component').then(
        (m) => m.TutorialComponent
      ),
  },
  {
    path: 'project-form',
    loadComponent: () =>
      import('./pages/project-form/project-form.component').then(
        (m) => m.ProjectFormComponent
      ),
  },

  {
    path: 'news-detail/:id',
    loadComponent: () =>
      import('./pages/news-detail/news-detail.component').then(
        (m) => m.NewsDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
