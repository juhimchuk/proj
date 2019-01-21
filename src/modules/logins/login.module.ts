import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule }        from '../../app/app-routing.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { JwtInterceptor } from '../../helpers/interceptors/jwt.interceptor';
import { ErrorInterceptor } from '../../helpers/interceptors/error.interceptor';

import { LoginComponent } from 'src/components/login/login.component';
import { AuthenticationService } from 'src/services/apiServices/auth/authentication.service';


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
    exports: [
        LoginComponent],
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