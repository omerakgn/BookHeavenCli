import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType } from '../../ui/custom-toastr.service';
import { User } from '../../../entities/user';
import { Create_User } from '../../../contracts/users/create_user';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from '../../../contracts/token/token';
import { TokenResponse } from '../../../contracts/token/tokenresponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async create(user : User): Promise<Create_User>
  {
    const observable : Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    },user);
    return await firstValueFrom(observable) as Create_User;

  }

  async login(Email: string,Password: string, callBackFunction : ()=> void ): Promise<any>{
    const observable : Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller:"users",
      action: "login" 
    }, {Email , Password})

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken); 
      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.","Giriş Başarılı",{
        messageType: ToastrMessageType.Success,
        
      })
    }
    callBackFunction();
  }
}
