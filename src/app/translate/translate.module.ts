import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserSettingsComponent } from '../pages/user-settings/user-settings.component';
import { BrowserModule } from '@angular/platform-browser';
import { LanguageService } from '../services/language.service';
import { TranslateComponent } from '../components/translate/translate.component';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [],
  imports: [
    TranslateModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage:'hr',
    })
  ],
  exports:[TranslateModule],
  providers: [LanguageService]
})
export class translateModule { }