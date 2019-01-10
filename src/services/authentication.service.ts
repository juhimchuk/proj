import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
    let model = "username=" + username + "&password=" + password + "&grant_type=" + "password";

        return this.http.post<any>(`http://localhost:63553/Token`, model)
            .pipe(map(user => {
                console.log(user.access_token);
                var s = JSON.stringify(user);
                console.log(user);
                console.log(s);
                // login successful if there's a jwt token in the response
                if (user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', user.access_token);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}