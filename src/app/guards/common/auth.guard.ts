import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import {  AuthService } from '../../services/common/auth.service';
import { AlertifyOptions, AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';


@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
     private router: Router,
     private toastrService: CustomToastrService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private authService: AuthService
    ){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    
    this.spinner.show(SpinnerType.BallSpinClockWise);
   
    const testfunction = () => {
      console.log("test function is run !");
      return "asdasd" ;
    };

    if(!this.authService.isAuthenticated){
    // this.router.navigate(["login"],{queryParams: {returnUrl: state.url}});
      console.dir("Oturum açmanız gerekiyor !");
      this.alertify.message("Oturum açmanız gerekiyor !",
        {
          dismissOthers: true, 
          messageType: MessageType.Error, 
          position: Position.TopCenter
        });
    
  
      }
      
     
    

    this.spinner.hide(SpinnerType.BallSpinClockWise);
    
    return true;
  }
  
}