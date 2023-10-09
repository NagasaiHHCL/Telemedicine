import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
import { DoctoreditComponent } from './doctoredit/doctoredit.component';
import { PatientsprofileComponent } from './patientsprofile/patientsprofile.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth.guard';

// const routes: Routes = [
//   {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
//   {path: 'dashboard', component: DashboardComponent},
//  {path:'doctors',component:DoctorsComponent},
//  {path:'patients',component:PatientsComponent},
//  {path:'appointments',component:AppointmentsComponent},
//  {path:'doctorprofile/:id',component:DoctorprofileComponent},
//  {path:'doctoredit/:id',component:DoctoreditComponent},
//  {path:'patientsprofile/:id',component:PatientsprofileComponent},
//  {path: 'login',component:LoginComponent}
// ];


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard]},
  { path: 'doctors', component: DoctorsComponent, canActivate: [AuthGuard] },
  { path: 'patients', component: PatientsComponent, canActivate: [AuthGuard] },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
  { path: 'doctorprofile/:id', component: DoctorprofileComponent, canActivate: [AuthGuard] },
  { path: 'doctoredit/:id', component: DoctoreditComponent, canActivate: [AuthGuard] },
  { path: 'patientsprofile/:id', component: PatientsprofileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }, // Login route does not require authentication
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
