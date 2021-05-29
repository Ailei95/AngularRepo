import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Registration} from '../../model/registration.model';
import {Observable} from 'rxjs';
import {Confirmation} from '../../model/confirmation.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  registration(registration: Registration): Observable<Confirmation> {
    return this.httpClient.post<Confirmation>(environment.apiUrl + '/api/registration', registration);
  }

  resend(email: string): Observable<void> {
    return this.httpClient.get<void>(environment.apiUrl + '/api/resend?email=' + email);
  }
}
