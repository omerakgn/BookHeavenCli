import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrOptions, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/common/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(public authService: AuthService,private router: Router, private toastrService: CustomToastrService){
    authService.identityCheck();
   }

   signOut(){
    this.authService.removeToken();
    this.router.navigate([""]);
    this.toastrService.message("Çıkış başarıyla gerçekleştirildi.","Çıkış Yapıldı",{
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight,
    })
   }

}
