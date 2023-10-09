import { Component } from '@angular/core';
import { FetchdataService } from '../fetchdata.service';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent {

  constructor (public service : FetchdataService) { }
  isLoading:boolean=true;
}
