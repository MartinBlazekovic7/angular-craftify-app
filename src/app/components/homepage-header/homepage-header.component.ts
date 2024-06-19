import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-homepage-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './homepage-header.component.html',
  styleUrl: './homepage-header.component.scss',
})
export class HomepageHeaderComponent {}
