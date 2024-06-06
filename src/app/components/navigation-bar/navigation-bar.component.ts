import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateComponent } from '../translate/translate.component';

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
    TranslateComponent
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent {
  sidebarVisible = false;
  currentLanguage?: string;

  constructor(private translate: TranslateService){
    translate.addLangs(['en', 'hr']);
    translate.setDefaultLang('hr');
    translate.use('hr');
    this.currentLanguage = this.translate.currentLang;
  }

  onLanguageChange(lang: string): void{
    this.translate.use(lang);
    this.currentLanguage = lang;
  }

  op:any;
}
