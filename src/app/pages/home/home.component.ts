import { HomepageOffersComponent } from './../../components/homepage-offers/homepage-offers.component';
import { HomepageHeaderComponent } from './../../components/homepage-header/homepage-header.component';
import { Component } from '@angular/core';
import { HomepageSliderComponent } from '../../components/homepage-slider/HomepageSliderComponent';
import { HomepageSearchComponent } from '../../components/homepage-search/homepage-search.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomepageSliderComponent,
    HomepageSearchComponent,
    HomepageHeaderComponent,
    HomepageOffersComponent,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
