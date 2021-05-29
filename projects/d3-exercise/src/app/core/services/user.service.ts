import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>(environment.apiUrl + '/api/user');
  }

  setAdmin(admin: boolean): Observable<User> {
    return this.httpClient.post<User>(environment.apiUrl + '/api/user?admin=' + admin, null);
  }
}
