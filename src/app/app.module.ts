import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarsModule } from 'src/modules/calendars/calendar.module';
import { LoginsModule } from 'src/modules/logins/login.module';
import { ReportsModule } from 'src/modules/reports/report.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CalendarsModule,
    LoginsModule,
    ReportsModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
