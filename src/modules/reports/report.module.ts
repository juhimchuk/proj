import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule }        from '../../app/app-routing.module';
import { ActivatedRoute, Router, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SubmitReportComponent } from 'src/components/submitReport/submit-report.component';
import { ProjectService } from '../../services/project/project.service';
import { SubmitReportService } from '../../services/submitReport/submit-report.service';
import { TaskService } from '../../services/task/task.service';
import { AuthGuard } from '../../guards/auth.guard';
import { JwtInterceptor } from '../../helpers/jwt.interceptor';
import { ErrorInterceptor } from '../../helpers/error.interceptor';
import { AuthenticationService } from '../../services/auth/authentication.service';


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