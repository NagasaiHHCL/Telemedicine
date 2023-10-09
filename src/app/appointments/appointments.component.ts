import { Component } from '@angular/core';
import { FetchdataService } from '../fetchdata.service';
import * as XLSX from "xlsx";
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  selectOption:number=0;
  selectedValue: number=0;
  searchTerm: string='';
  hasData: boolean = false;
  constructor(public service:FetchdataService){}
  ngOnInit():void{
    this.getAppointments();
    this.onValueChange();
  }
  // public data=[
  //   {SNo:'01',appointmentID:'#APT43233',patient:'bharath',agegender:'25, Male',mobilenum:9876543210,doctor:'Dr.Watson',date:'20 May,2023',time:'04',status:'Rescheduled'},
  //   {SNo:'02',appointmentID:'#APT43233',patient:'bharath',agegender:'25, Male',mobilenum:9876543210,doctor:'Dr.Watson',date:'20 May,2023',time:'04',status:'Rescheduled'},
  //   {SNo:'03',appointmentID:'#APT43233',patient:'bharath',agegender:'25, Male',mobilenum:9876543210,doctor:'Dr.Watson',date:'20 May,2023',time:'04',status:'Rescheduled'},
  //   {SNo:'04',appointmentID:'#APT43233',patient:'bharath',agegender:'25, Male',mobilenum:9876543210,doctor:'Dr.Watson',date:'20 May,2023',time:'04',status:'Rescheduled'},
  //   {SNo:'05',appointmentID:'#APT43233',patient:'bharath',agegender:'25, Male',mobilenum:9876543210,doctor:'Dr.Watson',date:'20 May,2023',time:'04',status:'Rescheduled'},
  //   {SNo:'06',appointmentID:'#APT43233',patient:'bharath',agegender:'25, Male',mobilenum:9876543210,doctor:'Dr.Watson',date:'20 May,2023',time:'04',status:'Rescheduled'},
  //   {SNo:'07',appointmentID:'#APT43233',patient:'bharath',agegender:'25, Male',mobilenum:9876543210,doctor:'Dr.Watson',date:'20 May,2023',time:'04',status:'Rescheduled'},
  //   {SNo:'08',appointmentID:'#APT43233',patient:'bharath',agegender:'25, Male',mobilenum:9876543210,doctor:'Dr.Watson',date:'20 May,2023',time:'04',status:'Rescheduled'},
  //   {SNo:'09',appointmentID:'#APT43233',patient:'bharath',agegender:'25, Male',mobilenum:9876543210,doctor:'Dr.Watson',date:'20 May,2023',time:'04',status:'Rescheduled'},
  //   {SNo:'10',appointmentID:'#APT43233',patient:'bharath',agegender:'25, Male',mobilenum:9876543210,doctor:'Dr.Watson',date:'20 May,2023',time:'04',status:'Rescheduled'},
  // ]


  onValueChange() {
  
  }
  showImage = true;

  removeImage(): void {
    this.showImage = false;
  }


  // api for appointments data
  

   data:any=[];
   rawdata:any=[];
  getAppointments(){
    this.selectedValue = parseInt(this.selectedValue.toString(), 10);
    console.log(this.selectedValue)
    let inputData={
      "category":this.selectedValue
    };
console.log(inputData);
  this.service.appointmentDetails(inputData).subscribe((res:any)=>{
    console.log(res)
    console.log(res.message);
    this.rawdata=res.message;
    this.data=res.message;
    this.hasData = res.message && res.message.length > 0;

  })
  }

 

  // for download data to excel
  fileName="Appointments.xlsx";
  exportexcel():void{
    //table ID is passed over here
    let element =document.getElementById("exceltable");

const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
//generate work book and add work sheet

const wb: XLSX.WorkBook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb,ws,"sheet1");

XLSX.writeFile(wb,this.fileName);

  }

  // api forn fetching docctor categories
    // api for fetching doctor specialization
    spldata:any=[];
    getdoctorspecial(){

      // this.selectedValue = parseInt(this.selectedValue.toString(), 10);
      // console.log(this.selectedValue)
      let inputData ={
 // "category":this.selectedValue
      }
      this.service.doctorSpecialization(inputData).subscribe((res:any)=>{
        console.log(res);
        this.spldata=res.message;
        this.getAppointments();
  
      })
    }


    // code for search in input field

    applySearchFilter() {
      // Reset the filter if the search term is empty
      if (!this.searchTerm) {
        this.data = this.rawdata;
        return;
      }
  
       
  

      
  // Apply the filter based on the search term (you can adjust this based on your use case)
  this.data = this.rawdata.filter((item:any) => {
    const dataString = JSON.stringify(item).toLowerCase();
    const searchTermLowerCase = this.searchTerm.toLowerCase();

    // Check if the dataString includes the search term (case-insensitive)
    return dataString.includes(searchTermLowerCase) || this.isNumberInData(item, searchTermLowerCase);
  });
}

isNumberInData(item: any, searchTerm: string): boolean {
  // Custom logic to check if the search term is a number and if it matches any numeric property
  for (const key in item) {
    if (item.hasOwnProperty(key) && typeof item[key] === 'number') {
      const numericValue = item[key].toString();
      if (numericValue.includes(searchTerm)) {
        return true;
      }
    }
  }
  return false;
    }

    getStatusClass(status: string): string {
      switch (status) {
        case 'active':
          return 'status-active';
        case 'rescheduled':
          return 'status-rescheduled';
        case 'completed':
          return 'status-completed';
        default:
          return '';
      }
    }
}
