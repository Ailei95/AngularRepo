import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user.model';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private store: Store
  ) {
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>('/api/user');
  }
}
