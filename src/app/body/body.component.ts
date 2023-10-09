import { Component, Input,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  constructor (private renderer:Renderer2) {}
  @Input() collapsed = true;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
   // console.log("55");
    // if (this.collapsed && this.screenWidth > 768 && this.screenWidth <= 1200) {
    //   styleClass = 'body-trimmed';
    // }
    //  else if (this.collapsed && this.screenWidth > 1200) {
    //   styleClass = 'body-trimmed';
    // }
    //  else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
    //   styleClass = 'body-md-screen';
    // }
    return styleClass;
  }

  ngOnInit(){
    // this.dtOptions={
    //   pagingType:'full_numbers',
    //   pageLength:5,
    //   lengthMenu : [ 5,10,15],
    //   processing : true

    // };


  }

}
