import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(form: {email: string, password: string, 'remember-me': boolean}): Observable<any> {
    const params = new HttpParams()
      .set('username', form.email)
      .set('password', form.password)
      .set('remember-me', String(form['remember-me']));
    return this.httpClient.post(environment.apiUrl + '/api/login', params);
  }

  logout(): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/api/logout', null);
  }
}
