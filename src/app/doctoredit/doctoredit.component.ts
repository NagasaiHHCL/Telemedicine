import { Component , Input,ViewChild,ElementRef} from '@angular/core';
import { FetchdataService } from '../fetchdata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-doctoredit',
  templateUrl: './doctoredit.component.html',
  styleUrls: ['./doctoredit.component.css']
})
export class DoctoreditComponent { 
public splarray: string[] = []

  spzData: any = [];
specialisedOptions: any[] = [];
selectedOptions: string[] = [];
constructor(public service :FetchdataService,private router :Router , private route:ActivatedRoute,private fb: FormBuilder){}
overviewData:any=[];
timetable:any=[];
overview:any=[];
userForm: any;
name:string='';
about:string='';
state:string='';
City:string='';
experience:number=0;
email:any='';
mobile:any='';
selectedColors: string[] = [];
imgURL: string[] = [];
imageFile: File | null = null;
idFromUrl: string | null = null;
activebutton=true;
inactivebutton=false;
formSubmitted = false; 
selectoption:number=0;
splarray1:any=[];

selectedID:any=[];

@ViewChild('fileInput') fileInput!: ElementRef;
// code for getting dummy image
@Input() imageUrl: string='';
@ViewChild('imageElement') imageElement !: ElementRef;


// implements ngOnInit
ngOnInit():void{
this.getSpecialization();

  this.route.paramMap.subscribe(params => {
    this.idFromUrl = params.get('id');
  });

// for collecting user info
  this.userForm = this.fb.group({
    name:['',[Validators.required]],
    state:['',[Validators.required]],
    City:['',[Validators.required]],
    
    //city:['',[Validators.required]],
   about:['',[Validators.required]],
    experience:['',[Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
  });


  this.fetchDoctorStatus();
  inactivebutton:false;

  //console.log(this.name , "from html")
  let pro1=this.route.snapshot.paramMap.get('id');
  let selectedValue = parseInt(pro1![0].toString(), 10);
  console.log(pro1);
  let inputData={
    "doctorId":selectedValue
  }
  console.log(inputData);
    //this.proID = parseInt(profileId.toString(), 10);
    this.service.doctorProfilein(inputData).subscribe((res:any) => {
     // this.profiledata = res.message;
     this.overviewData=res.message;
    this.overview=this.overviewData.overview;
this.splarray=this.overviewData.overview.specializations.split(',')
this.initializeSpecialisedOptions(this.splarray);
//console.log(this.splarray)
     this.timetable=this.overviewData.timeTable;
      console.log(res);
      console.log(this.overview)
      const baseurl='http://172.19.1.75:8081';
      const imgURL=baseurl + this.overviewData.overview?.img;
      console.log(imgURL);  
    })
}

gettingID(){
  let pro1=this.route.snapshot.paramMap.get('id');
  let selectedValue = parseInt(pro1![0].toString(), 10);
  console.log(pro1);
  let inputData={
    "doctorId":selectedValue
  }
  console.log(inputData);
    //this.proID = parseInt(profileId.toString(), 10);
    this.service.doctorProfilein(inputData).subscribe((res:any) => {
     // this.profiledata = res.message;
     this.overviewData=res.message;
    // this.overview=this.overviewData.overview;
      console.log(res);
    })
}


// api for doctorprofile update
// profileUpdate(){
//  // alert("ncjdsncjkn")
//   let pro1=this.route.snapshot.paramMap.get('id');
//   let selectedValue = parseInt(pro1![0].toString(), 10);
//   let inputData={
    
//       "about": this.overview.about,
//       "city": this.overview.city,
//       //"cost": 0,
//     //  "dept": 0,
//       "email": this.overview.email,
//       "experience": this.overview.experience,
//       //"gender": 0,
//       "id": selectedValue,
//      // "license": "string",
//       "mobile": this.overview.mobile,
//       "name": this.overview.name,
//       // "specialization": [
//       //   0
//       // ],
//       "state": this.overview.state
    
//   }
//   console.log(inputData)
//   this.service.updateProfile(inputData).subscribe((res:any)=>{
//     console.log(res);

//     if(res.message === 'Profile Updated Successfully'){
//       Swal.fire('Thank you...', 'You Profile Updated succesfully!', 'success')
   
  
//     }
//     else{
//       Swal.fire('Oops...', 'Profile Not Updated Successfully !')
//     }
//   })
// }

profileUpdate() {
  // Check if the form is valid before submitting
  if (this.userForm.valid) {
    let pro1 = this.route.snapshot.paramMap.get('id');
    if (pro1) {
      let selectedValue = parseInt(pro1[0].toString(), 10);
      if (!isNaN(selectedValue)) {
        let inputData = {
          "about": this.overview.about,
          "city": this.overview.city,
          "email": this.overview.email,
          "experience": this.overview.experience,
          "id": selectedValue,
          "mobile": this.overview.mobile,
          "name": this.overview.name,
          "state": this.overview.state
        }
        console.log(inputData);
        this.service.updateProfile(inputData).subscribe((res: any) => {
          console.log(res);
          if (res.message === 'Profile Updated Successfully') {
            Swal.fire('Thank you...', 'Your Profile Updated successfully!', 'success')
          } else {
            Swal.fire('Oops...', 'Profile Not Updated Successfully!')
          }
        });
      } else {
        console.error("Invalid ID format.");
      }
    } else {
      console.error("ID parameter not found.");
    }
  } else {
    console.error("Form is not valid. Submission prevented.");
  }
}

// api for profile pic update
// profilepic(){
//   let pro1=this.route.snapshot.paramMap.get('id');
//   let selectedValue = parseInt(pro1![0].toString(), 10);
//   let inputData={
//          "doctorId":selectedValue
//   }
//   this.service.updateProfilepic(inputData).subscribe((res:any)=>{
//     console.log(res);
  
//   })
// }




onFileSelected(event: any) {
  const file: File = event.target.files[0];
  this.imageFile = file;
  this.onSubmit();
}




onSubmit() {
 
  if (this.imageFile && this.idFromUrl) {
    const formData = new FormData();
    formData.append('img', this.imageFile);
    formData.append('doctorId',this.idFromUrl.toString());

    this.service.updateProfilepic(formData).subscribe(
      (response) => {
        // Handle successful response here
      
        Swal.fire({
          title: 'Success!',
          text: 'You Profile Updated succesfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        console.log('Image uploaded successfully.', response);
      },
      (error) => {
        // Handle error here
        console.error('Error uploading image.', error);
      }
    );
  }
}


// api for removing profile pic  
removeprofilepic() {
  Swal.fire({
    title: 'Are you sure?',
   // text: 'You will not be able to undo this action!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      if (this.idFromUrl) {
        const formData = new FormData();
        formData.append('doctorId', this.idFromUrl);
        
        this.service.removeprofilepic(formData).subscribe((res: any) => {
          console.log(res);
          if(res.message === 'Profile Pic Removed Successfully'){
          
            Swal.fire({
              title: 'Success!',
              text: 'You Profile Removed succesfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
          else{
            Swal.fire('Oops...', 'Profile Not Updated Successfully !')
          }
          
        });
      }
      console.log('User clicked "Yes"');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      console.log('User clicked "No"');
    }
  });



}


handleFileInput(event: Event): void {
  const fileInput = event.target as HTMLInputElement;
  const selectedFile = fileInput.files?.[0];
  
  if (selectedFile) {
    console.log('Selected file:', selectedFile.name);
    // You can perform further actions with the selected file
  }
}




fetchDoctorStatus(){
  if ( this.idFromUrl) {
  const formData = new FormData();
        formData.append('doctorId', this.idFromUrl);
       
  this.service.fetchstatus(formData).subscribe((res:any)=>{
    console.log(res);
    if(res.status === 1001){
      this.activebutton=false;
      this.inactivebutton=true;
 
    }
    else{
      this.activebutton=true;
      this.inactivebutton=false;
    }
  })
}
else{
  alert("error in fetching info")

}

}

profileActive(){
  if ( this.idFromUrl) {
    const formData = new FormData();
        formData.append('doctorId', this.idFromUrl);
        
  this.service.profileActivate(formData).subscribe((res:any)=>{
    console.log(res);
   // alert("in active")
   Swal.fire('Thank you...', 'You Profile updated succesfully!', 'success')

    this.activebutton=false;
    this.inactivebutton=true;

  })
}
}



profileInactive(){
  if ( this.idFromUrl) {
    const formData = new FormData();
        formData.append('doctorId', this.idFromUrl);
  this.service.profileInactivate(formData).subscribe((res:any)=>{
    console.log(res);
  //  alert("in inactive")
  Swal.fire('Thank you...', 'You Profile updated succesfully!', 'success')
  
    this.activebutton=true;
    this.inactivebutton=false;
  })
}
}



anotherFunction() {
  // Use the selectedOptions array as needed
}

// api for doctor specialization


getSpecialization(){
  let inputData={}
  this.service.getDoctorSpecialization(inputData).subscribe((res:any)=>{
    console.log(res);
    this.spzData =res.message;
    this.initializeSpecialisedOptions(this.splarray);

  })
}

// initializeSpecialisedOptions() {
//   this.specialisedOptions = this.spzData.map((obj: any) => ({
//     ...obj,
//     checked: this.splarray.includes(obj.specialization_id) // Check if specialization_id is in splarray
//   }));
//   console.log(this.specialisedOptions);
// }
// initializeSpecialisedOptions() {
//   const splarray1=['BAMS', 'BDS', 'BHMS', 'MBBS', 'BNYS']
//   this.specialisedOptions = this.spzData.map((obj: any) => {
//     const isChecked = this.splarray1.includes(obj.specialization_id);
//     return {
//       ...obj,
//       checked: isChecked
//     };
//   });
//   console.log(this.splarray);
//   console.log(this.spzData)

//   console.log(this.specialisedOptions);
// }

initializeSpecialisedOptions(specializationarray :any) {
 // let spzcheck:any=[]//this.overviewData.overview.specializations.split(',')
  this.specialisedOptions = this.spzData.map((obj: any) => {
    const isChecked = specializationarray.includes(obj.shortname);
    return {
      ...obj,
      status: isChecked
    };
  });
  console.log(this.overviewData)
  console.log(specializationarray)
  console.log(this.specialisedOptions);
}

//api for adding specialization changes
addSpecial(){
  if (this.idFromUrl) {

  const formData = new FormData();
        formData.append('doctorId', this.idFromUrl);
        const specializationIds = [this.selectedID]; 
        console.log(specializationIds)
        formData.append('specialization',this.selectedID);
        console.log(formData)
  this.service.addingSpecialization(formData).subscribe((res:any)=>{
    console.log(res);
    if(res.message === "Specialization added to doctor"){
  
      Swal.fire({
        title: 'Success!',
        text: 'You Specialization updated succesfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
    else{
      Swal.fire('Oops...', 'Profile Not Updated Successfully !')
     
      
    }

  })
}
}



selectedItemsText = '';
isDropdownOpen = false;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;

  if (!this.isDropdownOpen) {
    this.updateSelectedItemsText();
  }
}

updateSelectedItemsText() {
  const selectId=this.specialisedOptions.filter(option  => option.status ).map(option =>option.specialization_id);
  this.selectedID=selectId.join(',');
  const selectedOptions = this.specialisedOptions.filter(option => option.status).map(option => option.shortname);
  this.selectedItemsText = selectedOptions.join(', ');
  console.log(this.selectedItemsText)
}


toggleSelection(option: any) {
  option.checked = !option.checked;

  if (option.checked) {
    this.selectedOptions.push(option.specialization_id);
  //  this.anotherFunction(this.selectedOptions); // Pass the selected options
    this.updateSelectedItemsText();
  } else {
    const index = this.selectedOptions.indexOf(option.specialization_id);
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
    //  this.anotherFunction(this.selectedOptions); // Pass the updated selected options
      this.updateSelectedItemsText();
    }
  }
}
}
