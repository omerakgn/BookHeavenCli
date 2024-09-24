import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'console';
import { List_Product, listProductResponse } from '../../../contracts/list_product';
import { Observable, onErrorResumeNext } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "Book"
    }, product)
      .subscribe(result => {
        if (successCallBack) {
          successCallBack();  // Eğer tanımlıysa çağır
        }
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        if (errorCallBack) {
          errorCallBack(message);  // Eğer tanımlıysa çağır
        }
      });
  }
   
async read(successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Promise<List_Product[]> {
  try {
    const data: List_Product[] = await firstValueFrom(this.httpClientService.get<List_Product[]>({
      controller: "Book"
    }));

    successCallBack(); 
    return data;
  } catch (errorResponse) {
    if (errorResponse instanceof HttpErrorResponse) {
      errorCallBack(errorResponse.message);  
    }
    throw errorResponse;  
  }
}
  get(successCallBack: () => void, errorCallBack: (errorMessage: string) => void) : Observable<listProductResponse>
  {
    try{
      return this.httpClientService.get<listProductResponse>({
        controller: "Book"
      });
  
      successCallBack();
    }catch(errorResponse){
      if (errorResponse instanceof HttpErrorResponse) {
        errorCallBack(errorResponse.message);  
      }
      throw errorResponse;  

    }
    
  }


}
