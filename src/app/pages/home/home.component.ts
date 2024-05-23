import { Component } from '@angular/core';
import { HomepageSliderComponent } from '../../components/homepage-slider/HomepageSliderComponent';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomepageSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
