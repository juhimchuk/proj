import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CalendarDayComponent } from 'src/components/calendar/day/calendar-day.component';
import { CalendarMonthComponent } from 'src/components/calendar/month/calendar-month.component';
import { CalendarWeekRowComponent } from 'src/components/calendar/week-row/calendar-week-row.component';
import { CalendarWeekDayNamesComponent } from 'src/components/calendar/weekday-names/calendar-weekday-names.component';
import { CalendarManagerComponent } from './calendar-manager/calendar-manager.component';
import { CalendarHeaderComponent } from 'src/components/calendar/header/calendar-header.component';


@NgModule({
    imports: [
        BrowserModule, 
        FormsModule, 
        ReactiveFormsModule, 
        HttpClientModule, 
        NgbModule
    ],
    exports: [
        CalendarManagerComponent],
    declarations: [
        CalendarManagerComponent, 
        CalendarDayComponent, 
        CalendarWeekRowComponent,
        CalendarWeekDayNamesComponent,
        CalendarMonthComponent,
        CalendarHeaderComponent
    ],
    bootstrap: [
        CalendarManagerComponent
    ]
})
export class CalendarsModule { }