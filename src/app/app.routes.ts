import { Routes } from '@angular/router';

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
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./pages/registration/registration.component').then(
        (m) => m.RegistrationComponent
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.component').then(
        (m) => m.FavoritesComponent
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.component').then(
        (m) => m.SettingsComponent
      ),
  },
  {
    path: 'admin-dashboard',
    loadComponent: () =>
      import('./pages/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: 'profile/:id',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent
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
    path: 'create-project',
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
  },
];
