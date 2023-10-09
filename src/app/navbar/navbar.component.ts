import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { FetchdataService } from '../fetchdata.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor( private router: Router, private service : FetchdataService) {}
  // private authService: AuthService,
  logout() {
    this.service.clearSession();
   
    localStorage.removeItem("Loginauthenticator");
   // this.authService.logout(); // Call your authentication service's logout method
    this.router.navigate(['/login']); // Navigate to the login page or any other appropriate page
   // window.location.reload()
  }


  showImage = true;

  removeImage(): void {
    this.showImage = false;
  }

  
}
