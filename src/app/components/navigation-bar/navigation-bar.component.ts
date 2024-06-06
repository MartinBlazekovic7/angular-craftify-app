import { Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    ButtonModule,
    OverlayPanelModule,
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

  logout() {
    console.log('Logging out...');
    this.authService.logout().subscribe(() => {
      console.log('Logged out');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    });
  }
}
