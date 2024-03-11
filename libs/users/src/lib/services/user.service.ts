import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as contrieslib from 'i18n-iso-countries';
declare const require: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURLUser = environment.apiUrl + 'users';

  constructor(private http: HttpClient) {
    contrieslib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURLUser}/getUsersList`);
  }

  getUser(UserId: string): Observable<User> {
    console.log(UserId);
    return this.http.get<User>(`${this.apiURLUser}/getUserById/${UserId}`);
  }
  updateUser(userData: User, userid: string): Observable<User> {
    return this.http.put<User>(`${this.apiURLUser}/updateUserById/${userid}`, userData);
  }

  createUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiURLUser}/createUser`, userData);
  }

  // deleteProduct(productId: string): Observable<any> {
  //   return this.http.delete<any>(`${this.apiURLProducts}/deleteProductById/${productId}`);
  // }
  getCountries(): { id: string; name: string }[] {
    return Object.entries(
      contrieslib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }

  getCountry(countryKey: string): string | any {
    return contrieslib.getName(countryKey, 'en');
  }
}
