import { Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    ButtonModule,
    OverlayPanelModule,
    TranslateModule,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent implements OnInit {
  sidebarVisible = false;
  isUserLoggedIn = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
        window.location.href = '/';
      },
      error: (error) => {
        console.error('Error during logout', error);
        window.location.href = '/';
      },
    });
  }
}
