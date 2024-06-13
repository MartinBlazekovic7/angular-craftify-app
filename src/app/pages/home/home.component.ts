import { Component } from '@angular/core';
import { HomepageSliderComponent } from '../../components/homepage-slider/HomepageSliderComponent';
import { HomepageSearchComponent } from '../../homepage-search/homepage-search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomepageSliderComponent, HomepageSearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
