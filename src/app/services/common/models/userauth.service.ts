import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from '../../../contracts/token/tokenresponse';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  
  async login(Email: string,Password: string, callBackFunction : ()=> void ): Promise<any>{
    const observable : Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller:"auth",
      action: "login" 
    }, {Email , Password})

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){

      localStorage.setItem("accessToken", tokenResponse.tokendto.accessToken); 
      localStorage.setItem("refreshToken", tokenResponse.tokendto.refreshToken); 
      
      this.toastrService.message("Giriş başarıyla yapıldı", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      })
    }
    callBackFunction();
  }

  async refreshTokenLogin(refreshToken: string): Promise<any>{

    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      action:"refreshtokenlogin",
      controller:"auth"
    },{refreshToken: refreshToken});

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.tokendto.accessToken); 
      localStorage.setItem("refreshToken", tokenResponse.tokendto.refreshToken); 

      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır","Giriş Başarılı",{
        messageType:ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      })

    }
    
  }



}
