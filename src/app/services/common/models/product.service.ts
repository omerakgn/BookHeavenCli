import { Injectable } from '@angular/core';
import { HttpClientService, RequestParameter } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'console';
import { List_Product, listProductResponse } from '../../../contracts/list_product';
import { Observable, onErrorResumeNext } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { ListProductImage } from '../../../contracts/list_product_image';


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
          successCallBack();  
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
          errorCallBack(message);  
        }
      });
  };
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
    
  };

  async readImages(id: string, successCallBack: () => void): Promise<ListProductImage[]> {
    
    const getObservable: Observable<ListProductImage[]> = this.httpClientService.get<ListProductImage[]>({
      action: "getproductimages",
      controller: "Book"
    },id) 
    
    const images: ListProductImage[]=  await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }

  async deleteImages(id: string ,imageId: any, successCallBack: () => void){

    const deleteObservable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller: "Book",
      queryString: imageId,

    }, id)
    console.log("product id: " + id, typeof(id));
    console.log("image id: " + imageId,typeof(imageId));
    await firstValueFrom(deleteObservable);
    successCallBack();
  }
}


