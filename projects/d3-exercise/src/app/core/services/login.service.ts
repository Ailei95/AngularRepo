import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Confirmation} from '../../model/confirmation.model';
import {Registration} from '../../model/registration.model';
import {Login} from '../../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(log: Login): Observable<void> {
    const params = new HttpParams()
      .set('username', log.email)
      .set('password', log.password)
      .set('remember-me', String(log['remember-me']));
    return this.httpClient.post<void>(environment.apiUrl + '/api/login', params);
  }

  logout(): Observable<void> {
    return this.httpClient.post<void>(environment.apiUrl + '/api/logout', null);
  }
}
