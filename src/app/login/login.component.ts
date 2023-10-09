import { Component,ElementRef,Renderer2} from '@angular/core';
import {AppComponent} from '../app.component'
import { FetchdataService } from '../fetchdata.service';
 import {FormGroup,FormControl,Validators} from '@angular/forms'
 import Swal from 'sweetalert2';
 import {Router} from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: '',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:any;
  logname:any='';
  logpassword:any='';
  hide=true;
  isAuthenticated = false; 
 
  formSubmitted = false;
  constructor(private cookieService :CookieService, private router:Router, private appComponent: AppComponent,private renderer: Renderer2, private elementRef: ElementRef, public service:FetchdataService) {

   
  }

  showPassword: boolean = false;
  showicon :boolean =true;
  togglePasswordVisibility() {
   
    this.showPassword = !this.showPassword;
    const imgElement = document.getElementById('eyeimage'); // Assuming you have an element with id "imageId"
  this.renderer.setAttribute(imgElement, 'src', '../../assets/images/eye-off 1.svg');
  }
  ngOnInit() {
    this.disableSelector();
    this.applyStylesToClassName();

    this.loginForm=new FormGroup({
      "username":new FormControl('',[Validators.required,Validators.pattern(/[0-9]{5}/)]),
     
       "password":new FormControl('',Validators.required,)
      //  "location":new FormControl('',Validators.required,),
     });
 }


 get username() {
  return this.loginForm.get('username');
}

get password() {
  return this.loginForm.get('password');
}
 
 applyStylesToClassName() {
  const element = this.elementRef.nativeElement;
  this.renderer.addClass(element, 'body'); // Adds the CSS class 'my-class' to the element
  this.renderer.setStyle(element, 'background-color', '#F5F5F5'); // Applies the style 'color: red' to the element
}
  disableSelector() {
    this.appComponent.showSelector = false;
  const element = this.elementRef.nativeElement;
    this.renderer.addClass(element, 'body'); // Adds the CSS class 'my-class' to the element
    this.renderer.setStyle(element, 'background-color', '#F5F5F5'); 
  }

  refreshPage() {
    this.router.navigate(['dashboard']);
  }


  adminlogin(){
    this.formSubmitted = true;
    let inputData={
      "username":this.logname,
      "password":this.logpassword
    }
    console.log(inputData);
    this.service.adminLogin(inputData).subscribe((res:any)=>{
      console.log(res);
      let responseData=res.message;
      if(responseData === 'User Exists'){

         const sessionToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBfaWQiOiIxMjA1MSIsImlhdCI6MTY5MTk5MzIwM30.iOfoLlj95CCc358TKXFcLuoHKgHf2aoVgsJLu27g0LI';
    this.service.setSessionToken(sessionToken);
     console.log('Logged in with session token:', sessionToken);
   //  const expirationDate = new Date();
   //   expirationDate.setHours(expirationDate.getHours() + 1);
   //  expirationDate.setDate(expirationDate.getDate() + 0.1);
    // this.cookieService.set('sessionToken', sessionToken, expirationDate);
  localStorage.setItem("Loginauthenticator","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBfaWQiOiIxMjA1MSIsImlhdCI6MTY5MTk5MzIwM30.iOfoLlj95CCc358TKXFcLuoHKgHf2aoVgsJLu27g0LI")
      this.isAuthenticated = true;
      this.router.navigate(['dashboard']);
      window.location.reload();
      
      // Swal.fire({
      //   title: 'Success!',
      //   text: 'You logged-in successfully!',
      //   icon: 'success',
      //   confirmButtonText: 'OK',
      // }).then((result) => {
      //   if (result.isConfirmed) {
           
      //   }
      // });
   
      }
      else{
        Swal.fire('Oops...', 'Username and Password are Incorrect !')
      }
    }, (error)=>{
      Swal.fire('Oops...', 'Error in getting information')
      

    })
  }

  
  // setSessionCookie(sessionToken: string) {
  //   // Set the session cookie with a one-hour expiration time
  //   const expirationDate = new Date();
  //   expirationDate.setHours(expirationDate.getHours() + 1);

  //   this.cookieService.set('sessionToken', sessionToken, expirationDate);
  // }
}
