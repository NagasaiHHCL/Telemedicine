import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from './session.service';
import { FetchdataService } from './fetchdata.service';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor (private service: FetchdataService,private router :Router, private cookieService:CookieService ) {}

  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('AuthGuard canActivate called');
 //   const sessionToken = this.service.getSessionToken();
    const auth=localStorage.getItem("Loginauthenticator")
   // const auth=this.cookieService.get('sessionToken');
    console.log(auth,"in auth guard")
    if ( auth != undefined) {
      console.log('User is authenticated');
      return true; // User is authenticated, allow access
    } else {
      console.log('User is not authenticated');
      this.router.navigate(['/login']);
      return false; // User is not authenticated, redirect to login
    }
}



};

