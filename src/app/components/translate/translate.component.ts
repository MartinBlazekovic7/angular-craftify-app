import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.scss'
})
export class TranslateComponent implements OnInit{

  currentLanguage?: string;

  constructor(private translate: TranslateService){
    translate.addLangs(['en', 'hr']);
    translate.setDefaultLang('hr');
    translate.use('hr')
  }

  ngOnInit(): void {
  }

  
}
