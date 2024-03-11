import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private localstorage: LocalStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const token = this.localstorage.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }

  private _tokenExpired(expiration: any): boolean {
    return Math.floor(new Date().getDate() / 1000) >= expiration;
  }
}
