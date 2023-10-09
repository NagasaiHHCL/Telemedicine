import { Component, OnInit, } from '@angular/core';
import { FetchdataService } from '../fetchdata.service';
import { ActivatedRoute, Route } from '@angular/router';

import * as XLSX from "xlsx";

import { Router } from '@angular/router';
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  constructor (public service:FetchdataService, private route:Router) {}
  VAL:any;
  submitForm:any;
  searchTerm: string='';
  selectedOption: string = '';
  selectedCity:string='';
selectedState:any={};
  selectspl:number=0;
  selectspl1:number=0;
  selectedId: number=0;
  selectedCity1:number=0;
  ngOnInit(): void {
   // this.getDoctors();
    this.getdoctorspecial();
    this.getstate();
    this.getcity();
    // this.getcity();
    // this.getarea();
  //  this.doctorprofile(this.VAL);

    
    // this.submitForm=new FormGroup({
    //   // "username":new FormControl('',[Validators.required,Validators.pattern(/[0-9]{10}/)]),
    //   "doctorspl": new FormControl(''),
    //  "selectedOption" :new FormControl(''),
    //    "getcity1":new FormControl('',Validators.required,)
    //   //  "location":new FormControl('',Validators.required,),
    //  });
  }

  // @Input() fetchdat: any;

  statedata:any=[];
 citydata:any=[];

//getcity1:string='';
  handleSelectionChange() {
    this.getcity();
    console.log('Selected option:', this.selectedOption);
  }


// api for getting doctors data

  data:any=[];
  rawdata:any=[];
  hasData: boolean = false;
  getDoctors(){
  this.selectspl = parseInt(this.selectspl.toString(), 10);
  this.selectedState=this.statedata.find((obj:any) => obj.locationid === parseInt(this.selectedOption));
  this.selectedCity1=this.citydata.find((obj:any) => obj.locationid === parseInt(this.selectedOption));
  console.log(this.selectedState, this.selectedOption)
    let inputData={
      "category":this.selectspl,
//"state":this.selectedOption,
      "state":this.selectedState ? this.selectedState.locationname : this.selectedOption,
  
      "city":this.selectedCity,
  
      // "area":0
    }
  // alert("jncjsdncsjn")
  console.log(inputData, "for venky master")
    this.service.getDoctorsData(inputData).subscribe((res:any)=>{
console.log(res);
this.rawdata=res.message;
this.hasData=res.message && res.message.length >0;
this.data=res.message;

this.filterData();
    })
  }

  // api for getting doctors
  spldata:any=[];
  getdoctorspecial(){
    let inputData ={

    }
    this.service.doctorSpecialization(inputData).subscribe((res:any)=>{
      console.log(res);
      this.spldata=res.message;
this.getDoctors();
    })
  }

  // api for fetching state data
 // statedata:any=[];
  getstate(){
    let inputData={
     // "country": "India"
  }
  
    this.service.fetchState(inputData).subscribe((res:any)=>{
      console.log(res);
      this.statedata=res.message;
      console.log(this.statedata)
      
    })
  }

  // api  for fetching city details
 // citydata:any=[];
  getcity(){

    if(this.selectedOption)
    {
      // const selectedData = this.data.find((item:any) => item.name === this.selectedOption);
      // if (selectedData) {
      //   this.selectedId = selectedData.id;
      // }
     
      const formData = new FormData();
      formData.append('state', this.selectedOption);
  console.log(formData)
      this.service.fetchCity(formData).subscribe((res:any)=>{
        console.log(res);
        this.citydata=res.message;
        console.log(this.citydata);
        this.getDoctors();
      })


    }
    // else{
    //   alert("please contact to admin");
    // }

  }
  
  // api for fetching city details
  // areadata:any=[];
  // getarea(){
  //   let inputData={}
  //   this.service.fetchArea(inputData).subscribe((res:any)=>{
  //     console.log(res);
  //     this.areadata=res.message;
  //   })
  // }


  
  showImage = true;

  removeImage(): void {
    this.showImage = false;
  }


    // for download data to excel
    fileName="Doctors.xlsx";
    exportexcel():void{
      //table ID is passed over here
      let element =document.getElementById("exceltable");
  
  const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  //generate work book and add work sheet
  
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,"sheet1");
  
  XLSX.writeFile(wb,this.fileName);
  
    }

 
    viewProfile(profileId1: number) {
      this.route.navigate(['doctorprofile', profileId1]);
      console.log(profileId1)
    }
    
   
    applySearchFilter() {
      // Reset the filter if the search term is empty
      if (!this.searchTerm) {
        this.data = this.rawdata;
        return;
      }
  
       
    
      //  this.data = this.rawdata.filter((item:any) => {

      //   return item.doctor_name?.toLowerCase().includes(this.searchTerm.toLowerCase());
    

      // });
      this.data = this.rawdata.filter((item:any) => {
        const dataString = JSON.stringify(item).toLowerCase();
        const searchTermLowerCase = this.searchTerm.toLowerCase();
    
        // Check if the dataString includes the search term (case-insensitive)
        return dataString.includes(searchTermLowerCase) || this.isNumberInData(item, searchTermLowerCase);
      });
      
  // Apply the filter based on the search term (you can adjust this based on your use case)
  // this.data = this.rawdata.filter((item:any) => {
  //   const dataString = JSON.stringify(item).toLowerCase();
  //   const searchTermLowerCase = this.searchTerm.toLowerCase();

    // Check if the dataString includes the search term (case-insensitive)
   // return dataString.includes(searchTermLowerCase) || this.isNumberInData(item, searchTermLowerCase);

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


selectedStatus: string = 'all'; 

filterData() {

  if (this.selectedStatus === 'all') {
    // Show all data when 'All' is selected
    this.data = this.rawdata;

  } else {
    // Filter data based on the selected status ('active' or 'inactive')
    this.data = this.rawdata.filter((data:any) => data.status === this.selectedStatus);
    console.log(this.data)
 
  }
}

}
