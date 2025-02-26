import { AfterViewInit, Component,OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent extends BaseComponent implements OnInit{

  constructor(spinner: NgxSpinnerService){
    super(spinner);
  }
 
  
  ngOnInit(): void {
   this.showSpinner(SpinnerType.BallSpinClockWise);
  }
}
