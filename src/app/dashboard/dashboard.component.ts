import { Component, OnInit , Renderer2} from '@angular/core';
import { FetchdataService } from '../fetchdata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedOption: string = '';
  selectedCity:string='';
  selectspl:number=0;
  constructor(private renderer:Renderer2, public service:FetchdataService) { }

  handleSelectionChange() {
    this.getcity();
    console.log(this.selectedCity, 'selected city')
    console.log('Selected option:', this.selectedOption);
  }

  // public data=[
  //   {patient:'bharath',doctor:'Dr.Watson',department:'Oncology',time:'09:30',state:'Telangana',city:'Hyderabad',area:'Madhapur',status:'Pending'},
  //   {patient:'bharath',doctor:'Dr.Watson',department:'Oncology',time:'09:30',state:'Telangana',city:'Hyderabad',area:'Madhapur',status:'Pending'},
  //   {patient:'bharath',doctor:'Dr.Watson',department:'Oncology',time:'09:30',state:'Telangana',city:'Hyderabad',area:'Madhapur',status:'Pending'},
  //   {patient:'bharath',doctor:'Dr.Watson',department:'Oncology',time:'09:30',state:'Telangana',city:'Hyderabad',area:'Madhapur',status:'Pending'},
  //   {patient:'bharath',doctor:'Dr.Watson',department:'Oncology',time:'09:30',state:'Telangana',city:'Hyderabad',area:'Madhapur',status:'Pending'},
  //   {patient:'bharath',doctor:'Dr.Watson',department:'Oncology',time:'09:30',state:'Telangana',city:'Hyderabad',area:'Madhapur',status:'Pending'},
  //   {patient:'bharath',doctor:'Dr.Watson',department:'Oncology',time:'09:30',state:'Telangana',city:'Hyderabad',area:'Madhapur',status:'Pending'},
  //   {patient:'bharath',doctor:'Dr.Watson',department:'Oncology',time:'09:30',state:'Telangana',city:'Hyderabad',area:'Madhapur',status:'Pending'},
  //   {patient:'bharath',doctor:'Dr.Watson',department:'Oncology',time:'09:30',state:'Telangana',city:'Hyderabad',area:'Madhapur',status:'Pending'},
  //   {patient:'bharath',doctor:'Dr.Watson',department:'Oncology',time:'09:30',state:'Telangana',city:'Hyderabad',area:'Madhapur',status:'Pending'},
  //   {patient:'bharath',doctor:'Dr.Watson',department:'Oncology',time:'09:30',state:'Telangana',city:'Hyderabad',area:'Madhapur',status:'Pending'},
  //   {patient:'bharath',doctor:'Dr.Watson',department:'Oncology',time:'09:30',state:'Telangana',city:'Hyderabad',area:'Madhapur',status:'Pending'},
  //   {patient:'bharath',doctor:'Dr.Watson',department:'Oncology',time:'09:30',state:'Telangana',city:'Hyderabad',area:'Madhapur',status:'Pending'},
  //   {patient:'bharath',doctor:'Dr.Watson',department:'Oncology',time:'09:30',state:'Telangana',city:'Hyderabad',area:'Madhapur',status:'Pending'},

  // ]


  statename:any;
 // dtOptions: DataTables.Settings= {};

  ngOnInit(){
    // this.dtOptions={
    //   pagingType:'full_numbers',
    //   pageLength:5,
    //   lengthMenu : [ 5,10,15],
    //   processing : true

    // };
    const element = document.getElementById('body');
   
    // this.renderer.setStyle(element, 'width', 'calc(100% - 16.5625rem)');
    // this.renderer.setStyle(element, 'margin-left', '16.5625rem');
this.fetchDetailsDashboard();
this.getstate();
// this.getcity();
// this.getarea();
this.getdoctorspecial();
  }

  // api for fetching dashboard details
Data:any=[];
appointments:any=[];
fetchDetailsDashboard(){
  this.selectspl = parseInt(this.selectspl.toString(), 10);
    
let inputData={
  // "category":this.selectspl,
  "category":this.selectspl,
  "state":this.selectedOption,

  "city":this.selectedCity,

 // "area":0
}
console.log(inputData);
this.service.getDashboardDetails(inputData).subscribe((res:any)=>{
  console.log(res);
 let responseData=res.message;
this.Data=responseData;
this.appointments=responseData.appointmentsList;

console.log(this.appointments);
})
  }


  // api for fetching doctor specialization
  spldata:any=[];
 getdoctorspecial(){
  // alert("spl data")
    let inputData ={

    }
    this.service.doctorSpecialization(inputData).subscribe((res:any)=>{
      console.log(res);
      this.spldata=res.message;
      this.fetchDetailsDashboard();

    })
  }
  
  // api for fetching state data
  statedata:any=[];
  getstate(){
    let inputData={
     // "country": "india"
  }
    this.service.fetchState(inputData).subscribe((res:any)=>{
      console.log(res);
      this.statedata=res.message;
      this.fetchDetailsDashboard();

    })
  }

  // api  for fetching city details
  citydata:any=[];
  getcity(){
  //   let inputData={
  //    //  "country": "India",
  //     "state": this.selectedOption
  // }
  const formData = new FormData();
  formData.append('state', this.selectedOption);
  console.log(this.selectedCity+ "efkjhesbfujebfkuekiab")
   // console.log(inputData);
    this.service.fetchCity(formData).subscribe((res:any)=>{
   // alert("in city data")

      console.log(res);
      this.citydata=res.message;
      this.fetchDetailsDashboard();
console.log(this.citydata)
    })

  }
  
  // api for fetching area details
  // areadata:any=[];
  // getarea(){
  //   let inputData={
  //     "country": "India",
  //     "state": this.selectedOption
  // }
  //   this.service.fetchArea(inputData).subscribe((res:any)=>{
  //     console.log(res);
  //     this.areadata=res.data;
  //   })
  // }


}
