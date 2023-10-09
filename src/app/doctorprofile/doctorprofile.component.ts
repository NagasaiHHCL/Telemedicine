import { Component, OnInit ,Input,ViewChild,ElementRef} from '@angular/core';
import * as $ from "jquery";
import { FetchdataService } from '../fetchdata.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {
 

constructor (public service:FetchdataService, private route:ActivatedRoute,private router: Router){}

// code for getting dummy image

// code for tab system
clicktab(){
  var y=$(".tab1").on("click", function() {
    $(".tab1").find(".active").removeClass("active");
    $(this).parent().addClass("active");
    })
    
}


// Show the first tab by default
clicktabpan(){
  var z= $('.tabs-stage div').hide();
$('.tabs-stage div:first').show();
$('.tabs-nav li:first').addClass('tab-active');

// Change tab class and display content
$('.tabs-nav a').on('click', function(event){
  event.preventDefault();
  $('.tabs-nav li').removeClass('tab-active');
  $(this).parent().addClass('tab-active');
  $('.tabs-stage div').hide();
//  var z1= $($(this).attr('href')).show();
});
}

overviewData:any=[];
reviews:any=[];
reviewst:any=[];
timetable:any=[];
ngOnInit():void{

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
      console.log(res);
       this.overviewData=res.message;
       this.reviews=this.overviewData.reviews;
this.reviewst=this.overviewData.reviews.reviews;
this.timetable=this.overviewData.timeTable;
  //   console.log(this.reviews.count.reviews_count)
    });
}


// api for editing doctor profile
doctoredit(profileId1: number) {
  this.router.navigate(['doctoredit', profileId1]);
  console.log(profileId1)
}

}

