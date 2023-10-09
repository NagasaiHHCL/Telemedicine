import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private cookieService: CookieService) {}
    private user: any; // Store user data here

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  clearUser() {
    this.user = null;
  }

  
 
}

