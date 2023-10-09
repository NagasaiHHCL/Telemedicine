import { Component, OnInit,ViewChild,Input,ElementRef} from '@angular/core';
import { FetchdataService } from '../fetchdata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-patientsprofile',
  templateUrl: './patientsprofile.component.html',
  styleUrls: ['./patientsprofile.component.css']
})
export class PatientsprofileComponent implements OnInit {

  // code for getting dummy image
@Input() imageUrl: string='';
@ViewChild('imageElement') imageElement !: ElementRef;

  pdfSrc: string='';
  bsModalRef !: BsModalRef;
  @ViewChild('pdfModal') pdfModal: any;
constructor (public service : FetchdataService, private route:ActivatedRoute,private router: Router, private modalService: BsModalService) {

 // console.log(this.router.getCurrentNavigation().extras.state);
}
profiledata: any=[];
appointments:any=[];
medicalHistory:any=[];
medicalReports:any=[];
casesheet:any=[];
proID: number=0;
selectedValue:any='';
isJD: number=10; 
viewpatientsdata=false;
idFromUrl: string | null = null;
i:number =0;


public pdfData: string=''; // Base64 data from API
  pdfUrl: string='';  // URL for the PDF Blob
pdfData1:any=[];     // for medical reports data
casesheets:any=[];  // for casesheets data

selectedAppointmentId: number | null = null;
// api call for view of medical reports
onItemClick(id: number) {
  console.log(`Item with ID ${id} clicked`);
  // Here, you can perform any action you want when an item is clicked.
  this.selectedAppointmentId = id;
  const formData = new FormData();
  formData.append('appointmentId', id.toString());
  this.service.downloadmedicalreports(formData).subscribe((res:any)=>{
    console.log([res]);
    this.pdfData1=res.message;
    this.viewpatientsdata=true;

    this.service.downlaodCasesheets(formData).subscribe((res:any)=>{
      console.log([res]);
      this.casesheets=res.message;
    })

//     let result = [res];
//     let values = Object.keys(res).map(key => res[key]);
// alert(result[1]);
    
  })
}
    // api for fetching patients data
ngOnInit():void{
//this.getpat();

const data = history.state;


this.route.paramMap.subscribe(params => {
  this.idFromUrl = params.get('id');
});

// console.log(history.state+"test");
  

let pro1=this.route.snapshot.paramMap.get('id');
let selectedValue = parseInt(pro1![0].toString(), 10);
console.log(pro1);
let inputData={
  "patientId":selectedValue
}
console.log(inputData);
  //this.proID = parseInt(profileId.toString(), 10);
  this.service.patientProfile(inputData).subscribe((res:any) => {
    this.profiledata = res.message;
    console.log(res);
    this.appointments=this.profiledata.appointmentsHistory;
    this.medicalHistory=this.profiledata.medicalHistory;
    this.medicalReports=this.profiledata.medicalReports;
    this.casesheet=this.profiledata.caseSheets;
    console.log(this.medicalHistory)
    console.log(this.appointments);


    
  });
}


// fetchProfile() {
//   //this.proID = parseInt(profileId.toString(), 10);
//   let inputData={
//     "patientId":3
//   }
//   this.service.patientProfile(inputData).subscribe((data) => {
//     this.profile = data;
//     console.log(this.profile, this.proID);
//   });
// }


viewpdf(){

  this.service.downloadmedicalreports(this.appointments.appointment_id).subscribe((res:any)=>{      

    let Jdpdf = new Blob([res], { type: 'application/pdf' });

    // console.log(Jdpdf)

    this.isJD = Jdpdf.size

    // console.log(this.isJD)

    var JdpdfURL = URL.createObjectURL(Jdpdf);

    // this.Jdpdf_web = JdpdfURL;

    // this.Jdpdf_mob=this.dom.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(Jdpdf));

    // console.log(Jdpdf.size);

  })


}

// convertAndDisplayPDF() {
//   const base64Data = 'data:application/octet-stream;base64,' +this.pdfData;; // Replace with your base64-encoded PDF data

//   const binaryData = atob(base64Data);
//   const blob = new Blob([binaryData], { type: 'application/pdf' });
//   this.pdfUrl = URL.createObjectURL(blob);
// }


//this.pdfData

// showPdf(ind : number)
// {
//   alert(ind)
 
// //   let alength=this.pdfData1.length
// //  for(let i=0; i< alength;i++){
//   const pdffile=this.pdfData1[ind]
//   const linkSource =
//       'data:application/octet-stream;base64,' + pdffile.filedata;
//     const downloadLink = document.createElement('a');
//     const fileName = pdffile.filename;

//     downloadLink.href = linkSource;
//     downloadLink.download = fileName;
//     downloadLink.click();
// //  }
 
  
// }



//pdfData1 = [/* ... */]; // Your PDF data array

showPdf(ind: number): void {
  const pdffile = this.pdfData1[ind];
  const pdfDataUri = 'data:application/pdf;base64,' + pdffile.filedata;

  // Create a popup for displaying PDF preview
  const popup = window.open('', '_blank', 'width=800,height=600');
  if (popup) {
    const pdfContent = `<embed src="${pdfDataUri}" type="application/pdf" width="100%" height="100%"/>`;
    popup.document.write(pdfContent);
  } else {
    alert('Popup blocked. Please allow popups for this site.');
  }
}

downloadPdf(ind: number): void {
  const pdffile = this.pdfData1[ind];
  const pdfDataUri = 'data:application/octet-stream;base64,' + pdffile.filedata;
  const downloadLink = document.createElement('a');
  downloadLink.href = pdfDataUri;
  downloadLink.download = pdffile.filename;
  downloadLink.textContent = 'Download PDF';

  // Add the download link to the PDF preview container
  const pdfPreviewContainer = document.getElementById('pdfPreviewContainer');
  if (pdfPreviewContainer) {
    pdfPreviewContainer.innerHTML = ''; // Clear previous content
    pdfPreviewContainer.appendChild(downloadLink);
  }
}


showcasesheets(ind : number){
  const pdffile = this.casesheets[ind];
  const pdfDataUri = 'data:application/pdf;base64,' + pdffile.filedata;

  // Create a popup for displaying PDF preview
  const popup = window.open('', '_blank', 'width=800,height=600');
  if (popup) {
    const pdfContent = `<embed src="${pdfDataUri}" type="application/pdf" width="100%" height="100%"/>`;
    popup.document.write(pdfContent);
  } else {
    alert('Popup blocked. Please allow popups for this site.');
  }
}


downloadcasesheets(ind: number): void {
  const pdffile = this.casesheets[ind];
  const pdfDataUri = 'data:application/octet-stream;base64,' + pdffile.filedata;
  const downloadLink = document.createElement('a');
  downloadLink.href = pdfDataUri;
  downloadLink.download = pdffile.filename;
  downloadLink.textContent = 'Download PDF';

  // Add the download link to the PDF preview container
  const pdfPreviewContainer = document.getElementById('pdfPreviewContainer');
  if (pdfPreviewContainer) {
    pdfPreviewContainer.innerHTML = ''; // Clear previous content
    pdfPreviewContainer.appendChild(downloadLink);
  }
}


}