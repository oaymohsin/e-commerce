import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURLUsers = environment.apiUrl + 'users';
  constructor(private http: HttpClient, private router: Router,private token:LocalStorageService) {}


login(email:string,password:string):Observable<User>{
  return this.http.post<User>(`${this.apiURLUsers}/userLogin`,{email,password})
}

logOut(){
  this.token.removeToken()
  this.router.navigate(['/login']);

}

}
