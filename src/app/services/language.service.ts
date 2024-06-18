import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

   initLanguage(){
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    this.translate.setDefaultLang(savedLanguage);
    this.translate.use(savedLanguage);
  }

  changeLanguage(language:string){
    this.translate.use(language);
    localStorage.setItem('selectedLanguage', language);
  }
  getCurrentLanguage(): string{
    return this.translate.currentLang;
  }
}
