import { Injectable } from '@angular/core';
const TOKEN = 'jwtToken';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setToken(data: any) {
    return localStorage.setItem(TOKEN, data);
  }

  getToken(): string | any {
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }
}
