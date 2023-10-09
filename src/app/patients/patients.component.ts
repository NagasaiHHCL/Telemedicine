import { Component } from '@angular/core';
import { FetchdataService } from '../fetchdata.service';
import * as XLSX from "xlsx";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {

  public product ={};
constructor (public service : FetchdataService,private route:Router) {}
public docdata=[];
searchTerm: string='';
ngOnInit():void {
  this.getpatients();
 // this.getPatientsData(this.dataID);


}


hasData: boolean = false;
  data:any=[];
  rawdata:any=[];
  getpatients(){
    let inputData={

    } 
 
    this.service.patientDetails(inputData).subscribe((res:any) =>{
      console.log(res);
      this.hasData = res.message && res.message.length > 0;
  this.data=res.message;
  this.rawdata=res.message;
 
    })
  }



    // for download data to excel
    fileName="Patients.xlsx";
    exportexcel():void{
      //table ID is passed over here
      let element =document.getElementById("exceltable");
  
  const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  //generate work book and add work sheet
  
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,"sheet1");
  
  XLSX.writeFile(wb,this.fileName);
  
    }

  
  showImage = true;

  removeImage(): void {
    this.showImage = false;
  }

  // api for fetching patients data
  
  // getPatientsData(docdata:any){
  //   console.log(docdata+"hhh");
  //  //this.route.navigate(['patientsprofile']) 
  //   this.product = { id: 'dataID' };
  //  this.route.navigateByUrl('/patientsprofile', { state: docdata });
  // }

  viewProfile(profileId: number) {
    this.route.navigate(['patientsprofile', profileId]);
    console.log(profileId)
  }
//   getPatientsData(){  ,{id:dataID}
//     this.activateROute.paramMap.subscribe(params => {
//       const individualId = params.get('ID');
//       // Make an API call to retrieve the individual information based on the ID
//       // Update your component properties accordingly

  
//     let inputData={
//  "patientId":individualId
//     }
//     console.log(inputData)
//     this.service.patientProfile(inputData).subscribe((res)=>{
//       console.log(res);
//     })
//    });
//   }

applySearchFilter() {
  // Reset the filter if the search term is empty
  if (!this.searchTerm) {
    this.data = this.rawdata;
    return;
  }

   
  // // // Apply the filter based on the search term (you can adjust this based on your use case)
  //  this.data = this.rawdata.filter((item:any) => {
  // //   // Example: If your API data has a property called 'name', you can filter based on that
  //   return item.patient_name?.toLowerCase().includes(this.searchTerm.toLowerCase());
  // //   //return item.doctorname?.toLowerCase().includes(this.searchTerm.toLowerCase());

  // //  const dataString = JSON.stringify(item).toLowerCase();
  // //  return dataString.includes(this.searchTerm.toLowerCase());

  // });

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
}
