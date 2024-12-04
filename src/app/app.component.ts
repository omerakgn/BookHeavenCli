import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrOptions, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BookHeavenCli';
  constructor(private router: Router){
    
   }


  searching(event:any){
    console.log("routing");
    this.router.navigateByUrl('/search/' + event.target.value );
  }
}
