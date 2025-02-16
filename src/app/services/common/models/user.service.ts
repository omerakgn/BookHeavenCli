import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { User, UserResponse } from '../../../contracts/users/user';
import { Create_User } from '../../../contracts/users/create_user';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from '../../../contracts/token/token';
import { TokenResponse } from '../../../contracts/token/tokenresponse';
import { listProductResponse } from '../../../contracts/list_product';

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
  get(successCallBack: () => void, errorCallBack: () => void,id?:string,imageId?:string) : Observable<UserResponse>
  {
     
        const getObservable: Observable<UserResponse> =  this.httpClientService.get<UserResponse>({
          controller: "Users",
          action: "GetAllUsers"
        });

        if(successCallBack){
          successCallBack();
        }           
        else{
          errorCallBack();
          console.log("error callback is run !");
        }
          
          return getObservable;
      
      };

      async delete(id: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){

        const deleteObservable = this.httpClientService.delete({
          controller: "Users",
          action: "DeleteUser",
         
        }, id).subscribe(data => {
          console.log("data   adsda",data);
        });
      
        if(successCallBack){
      
          successCallBack();
        }
        else{
          errorCallBack && errorCallBack("Bir hata oluştu sonra tekrar deneyiniz.");
        }
      
        
       
       }


}
