import { Component , Input} from '@angular/core';

@Component({
  selector: 'app-starrating',
  templateUrl: './starrating.component.html',
  styleUrls: ['./starrating.component.css']
})
export class StarratingComponent {

  @Input() rating :any;
  @Input() rating1 :any;

  starList: boolean[] = [];
  starList1: boolean[] = [];

  ngOnInit() {
    this.starList = Array(5).fill(false).map((_, index) => index < this.rating);
    // this.starList1 = Array(1).fill(false).map((_, index) => index < this.rating1);

  }
}
