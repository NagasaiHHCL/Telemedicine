import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { LoginComponent } from './login/login.component';
import { DoctoreditComponent } from './doctoredit/doctoredit.component';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
import { PatientsprofileComponent } from './patientsprofile/patientsprofile.component';
import { NavbarComponent } from './navbar/navbar.component';
//  import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { StarratingComponent } from './starrating/starrating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';

import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { LoaderInterceptor } from './loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    DoctorsComponent,
    PatientsComponent,
    AppointmentsComponent,
    LoginComponent,
    DoctoreditComponent,
    DoctorprofileComponent,
    PatientsprofileComponent,
    NavbarComponent,
    StarratingComponent,
    PdfViewerComponent,
    DoctorEditComponent,
 

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
HttpClientModule,
ReactiveFormsModule,
NgxExtendedPdfViewerModule,
ModalModule.forRoot(),


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
