import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule }        from '../../app/app-routing.module';
import { ActivatedRoute, Router, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { JwtInterceptor } from '../../helpers/jwt.interceptor';
import { ErrorInterceptor } from '../../helpers/error.interceptor';
import { AuthenticationService } from '../../services/authentication.service';

import { LoginComponent } from 'src/components/login/login.component';


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
        LoginComponent 
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [
        LoginComponent
    ]
})
export class LoginsModule { }