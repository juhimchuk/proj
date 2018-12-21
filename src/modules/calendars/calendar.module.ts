import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CalendarDayComponent } from 'src/components/calendar/day/calendar-day.component';
import { CalendarMonthComponent } from 'src/components/calendar/month/calendar-month.component';
import { CalendarWeekRowComponent } from 'src/components/calendar/week-row/calendar-week-row.component';


@NgModule({
    imports: [
        BrowserModule, 
        FormsModule, 
        ReactiveFormsModule, 
        HttpClientModule, 
        NgbModule
    ],
    declarations: [
        CalendarDayComponent, 
        CalendarWeekRowComponent,
        CalendarMonthComponent, 
    ],
    bootstrap: [
        CalendarMonthComponent
    ]
})
export class CalendarsModule { }