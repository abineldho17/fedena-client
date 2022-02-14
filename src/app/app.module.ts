import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import {TranslatorPipe} from 'src/app/translator'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './providers/auth-interceptor';
import { AnnouncePipe } from './announce.pipe';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from './translate-config.service';
import { DatePipe } from '@angular/common';
import { Chart } from 'chart.js';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import {  ChartsModule } 
export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent, AnnouncePipe],
  entryComponents: [],
  imports: [NgxDatatableModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (LanguageLoader),
      deps: [HttpClient]
    }
  })],
  providers: [DatePipe,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true,},{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },TranslateConfigService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
