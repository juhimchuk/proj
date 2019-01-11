import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

    private readonly url = "http://localhost:63553/Token";


    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
    let model = "username=" + username + "&password=" + password + "&grant_type=" + "password";

        return this.http.post<any>(this.url, model)
            .pipe(map(user => {
                if (user.access_token) {
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