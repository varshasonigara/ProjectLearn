import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate() {
    if(this.authService.isLoggedIn()) {
      //navigate to home page
    }
    return !this.authService.isLoggedIn();
  }

}
