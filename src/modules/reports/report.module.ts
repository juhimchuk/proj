import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule }        from '../../app/app-routing.module';
import { RouterModule, } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SubmitReportComponent } from 'src/components/submitReport/submit-report.component';
import { AuthGuard } from '../../guards/auth.guard';
import { JwtInterceptor } from '../../helpers/jwt.interceptor';
import { ErrorInterceptor } from '../../helpers/error.interceptor';
import { ProjectService } from 'src/services/apiServices/project/project.service';
import { TaskService } from 'src/services/apiServices/task/task.service';
import { AuthenticationService } from 'src/services/apiServices/auth/authentication.service';
import { SubmitReportService } from 'src/services/apiServices/submitReport/submit-report.service';


@NgModule({
    imports: [
        BrowserModule, 
        FormsModule,
        ReactiveFormsModule, 
        HttpClientModule, 
        NgbModule,
        RouterModule,
        AppRoutingModule
    ],
    declarations: [
        SubmitReportComponent
    ],
    exports: [
        SubmitReportComponent],
    providers: [
        AuthGuard,
        ProjectService,
        TaskService,
        AuthenticationService,
        SubmitReportService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [
        SubmitReportComponent
    ]
})
export class ReportsModule { }