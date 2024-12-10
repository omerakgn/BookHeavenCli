import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { _isAuthenticated } from '../../services/common/auth.service';


@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
     private router: Router,
     private toastrService: CustomToastrService,
      private spinner: NgxSpinnerService

    ){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    
    this.spinner.show(SpinnerType.BallSpinClockWise);
   
    
    if(!_isAuthenticated){
     this.router.navigate(["login"],{queryParams: {returnUrl: state.url}});
    
      this.toastrService.message("Oturum açmanız gerekiyor !", "Yetkisiz Erişim!", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight,
      })

     
    }

    this.spinner.hide(SpinnerType.BallSpinClockWise);
    
    return true;
  }
  
}