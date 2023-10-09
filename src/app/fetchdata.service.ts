import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable ,BehaviorSubject} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class FetchdataService {
  constructor(private http:HttpClient, private cookieService: CookieService) { }



  private isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading.asObservable();

   private user: any; // Store user data here
//code for session 
setSessionToken(sessionToken: string) {
  // Set the session token in a cookie with a one-hour expiration time
  this.cookieService.set('sessionToken', sessionToken, 1 / 24); // 1 hour
}

getSessionToken() {
  // Get the session token from the cookie
  return this.cookieService.get('sessionToken');
}
clearSession() {
  // Clear the session cookie
  this.cookieService.delete('sessionToken');
}

isSessionActive(): boolean {
  // Check if the session is active (optional)
  return !!this.getSessionToken();
}


  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  clearUser() {
    this.user = null;
  }
  
  showLoader() {
    this.isLoading.next(true);
  }

  hideLoader() {
    this.isLoading.next(false);
  }

  localURL:any='http://192.168.30.223:8000/TeleMedicine';
 //  localURL:any='http://172.19.1.75:8081/TeleMedicine';

 // localURL:any='http://172.19.1.75:1385';

 
  // var req = unirest("GET", "https://www.universal-tutorial.com/api/getaccesstoken");

  // req.headers({
  //   "Accept": "application/json",
  //   "api-token": "AuXnFjES43NqbdODZoc1anLtpO9op_9HsA7hqU56HJoxlbbNrMsUAzmsp6cqoZ0HhWQ",
  //   "user-email": "abc@gmail.com"
  // });


  
  // api for dashboard
getDashboardDetails(data:any){
  return this.http.post(this.localURL+'/admindashboard/data',data)
}

// api for fetching doctors
getDoctorsData(data:any){
return this.http.post(this.localURL+'/admindoctors/doctorslist', data)
}
// api for fetching doctor profile
doctorProfilein(data:any){
  return this.http.post(this.localURL+'/admindoctors/doctorprofile',data)
}

// api for fetching specialization
doctorSpecialization(data:any){
  return this.http.post(this.localURL+'/spare/departments',data);
}
// api for fetching state details
fetchState(data:any){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json', // Example header
    'Authorization': 'luPbQPVDoRCTyGDWOsDPoJy3zrIj1i05OgCykF1rw4gH53p7ovq9QjtOu0HDpQf84IE', // Example Authorization header
  });
return this.http.post(this.localURL+'/spare/states',data);
//return this.http.get('https://www.universal-tutorial.com/api/states/United States', { headers: headers })
}

// api for fetching city
fetchCity(data:any){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json', // Example header
    'Authorization': 'luPbQPVDoRCTyGDWOsDPoJy3zrIj1i05OgCykF1rw4gH53p7ovq9QjtOu0HDpQf84IE', // Example Authorization header
  });
  return this.http.post(this.localURL+'/spare/cities',data);
 //  return this.http.get('https://www.universal-tutorial.com/api/cities/Alaska', { headers: headers })
}

// api for fetching area
fetchArea(data:any){
return this.http.post(this.localURL+'/patientspare/arealist',data);
}

// api for login
adminLogin(data:any){
  return this.http.post(this.localURL+'/login',data)
}

// api for doctor profile
doctorprofile(data:any){
  return this.http.post(this.localURL+'/admindoctors/doctorprofile',data)
}

// api for patient details
patientDetails(data:any){
  return this.http.post(this.localURL+'/adminpatients/patientslist',data);
}

// api for appointment details
appointmentDetails(data:any){
  return this.http.post(this.localURL+'/adminappointments/data',data);
}

// api for fetching doctorProfileinfo
doctorProfileinfo(data:any){
  return this.http.post('http://172.19.1.46:1092/admindoctors/doctorprofile',data)
}

// api for fetching paatient profile
patientProfile(data:any){
  return this.http.post(this.localURL+'/adminpatients/patientprofile',data);
}

getByteArrayData(): Observable<ArrayBuffer> {
  return this.http.post(this.localURL+'/adminpatients/patientprofile', { responseType: 'arraybuffer' }) as Observable<ArrayBuffer>;
}
// api for fetching doctor edit 
doctorEditProfile(data:any){
  return this.http.post(this.localURL+'/admindoctors/updateprofile',data)
}

// api for updating profile
updateProfile(data:any){
  return this.http.post(this.localURL+ '/admindoctors/updateprofile',data)
}
// api for updating profile pic
updateProfilepic(formData: FormData){
  return this.http.post(this.localURL+'/doctorprofile/updateprofilepic',formData)
}

// api for removing profile pic
removeprofilepic(formData : FormData){
  return this.http.post(this.localURL+'/doctorprofile/removeprofilepic',formData)
}

getDoctorSpecialization(data:any){
return this.http.post(this.localURL+'/spare/specializations',data)
}
addingSpecialization(data:any){
  return this.http.post(this.localURL+'/admindoctors/addspecialization',data)
}
fetchstatus(data:any){
  return this.http.post(this.localURL+'/admindoctors/profilestatus',data)
}

profileActivate(data:any){
  return this.http.post(this.localURL+'/admindoctors/profileactivate',data)
}

profileInactivate(data:any){
  return this.http.post(this.localURL+'/admindoctors/profileinactivate',data)
}

downloadmedicalreports(data:any){
  return this.http.post(this.localURL+'/spare/downloadmedicalreports',data)
}

// api for downloading casesheets
downlaodCasesheets(data:any){
  return this.http.post(this.localURL+'/spare/downloadcasesheets',data)
}
}
