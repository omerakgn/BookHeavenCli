import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService,@Inject(PLATFORM_ID) private platformId: Object) {}

getToken():string | null{

  if(isPlatformBrowser(this.platformId)){
    return localStorage.getItem("accessToken")as string;
  }
  return null;
}


identityCheck(): boolean {
  if (isPlatformBrowser(this.platformId)) {
    const token: string | null = this.getToken();
    let expired: boolean = true;

    if (token) {
      expired = this.jwtHelper.isTokenExpired(token);
    }

    _isAuthenticated = token != null && !expired;

  } 
  else {
    _isAuthenticated = false; 
  }

  return _isAuthenticated;
}


get isAdmin(): boolean {
  const token: string | null = this.getToken()as string;

  if (token) {
    const decodedToken = this.jwtHelper.decodeToken(token);

    const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
 
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    const now = Date.now();

    if (now > exp) {
      localStorage.removeItem('accessToken'); 
      console.log('Token süresi doldu ve silindi.');
    }


    if (Array.isArray(roles)) {   
      return roles.includes('Admin');
    } else if (typeof roles === 'string') { 
    
      return roles === 'Admin';
    }
  }
  
  return false;
}

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
  
  removeToken(){
    if(isPlatformBrowser(this.platformId)){

      localStorage.removeItem("accessToken");
      this.identityCheck();
    }
  }

   getUser(){
    const token: string | null = this.getToken()as string;

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);

      const name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      
      return name;
    }

    return null;
  }
}

export let _isAuthenticated: boolean;
