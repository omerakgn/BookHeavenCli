import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService,@Inject(PLATFORM_ID) private platformId: Object) {}

  identityCheck(){

    console.log("selam");
    if(isPlatformBrowser(this.platformId)){

      const tokendto: string | null = localStorage.getItem("accessToken")as string;
      console.log("selam 2");
   
      let expired: boolean;
      if(tokendto){
   
      expired = this.jwtHelper.isTokenExpired(tokendto);
      console.log("expired try:" +expired);
      
    }else{
      expired=true;
      console.log("expired catch:" +expired)
    }

    _isAuthenticated = tokendto != null && !expired;
    
   
  }}

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
  
  removeToken(){
    if(isPlatformBrowser(this.platformId)){

      localStorage.removeItem("accessToken");
      this.identityCheck();
    }
  }
}

export let _isAuthenticated: boolean;