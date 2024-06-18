import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.scss',
})
export class TranslateComponent {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'hr']);
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
