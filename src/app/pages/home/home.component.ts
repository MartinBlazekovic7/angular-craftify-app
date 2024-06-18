import { Component } from '@angular/core';
import { HomepageSliderComponent } from '../../components/homepage-slider/HomepageSliderComponent';
import { HomepageSearchComponent } from '../../homepage-search/homepage-search.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomepageSliderComponent, HomepageSearchComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
