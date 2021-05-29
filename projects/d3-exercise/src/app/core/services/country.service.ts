import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Country} from '../../model/country.model';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(environment.apiUrl + '/api/admin/countries');
  }

  add(country: Country): Observable<any> {
    if (country.file) {
      return this.httpClient.post(environment.apiUrl + '/api/admin/countries_mp', country);
    } else {
      const { name, isoCode } = country;
      return this.httpClient.post(environment.apiUrl + '/api/admin/countries', { name, isoCode });
    }
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + '/api/admin/countries/' + id);
  }
}
