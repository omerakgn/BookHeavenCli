import { Inject, Injectable } from '@angular/core';
import { HttpClientService, RequestParameter } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'console';
import { Product, ProductResponse, listProductResponse } from '../../../contracts/list_product';
import { Observable, onErrorResumeNext } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { ListProductImage, productImage } from '../../../contracts/list_product_image';

const PRODUCT_IMAGE_BASE_URL = "https://localhost:7250/"
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService, @Inject("baseUrl") private baseUrl: string) { }

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
        _error.forEach((v) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        if (errorCallBack) {
          errorCallBack(message);  
        }
      });
  };


  get(successCallBack: () => void, errorCallBack: () => void,id?:string,imageId?:string) : Observable<listProductResponse>
  {
     
        const getObservable: Observable<listProductResponse> =  this.httpClientService.get<listProductResponse>({
          controller: "Book"
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

  getById(successCallBack: () => void, errorCallBack: () => void,id:string,imageId?:string) : Observable<ProductResponse>{
    
    const getObservable: Observable<ProductResponse> =  this.httpClientService.get<ProductResponse>({
      controller: "Book"
    },id);
    console.log("Product Service id değeri :", id); 

    if(successCallBack){
      successCallBack();
    }           
    else{
      errorCallBack();
      console.log("error callback is run !");
    }
      
      return getObservable;

  };

  async readImages(id: string, successCallBack: () => void): Promise<productImage[]> {
    
    const getObservable: Observable<ListProductImage> = this.httpClientService.get<ListProductImage>({
      action: "getproductimages",
      controller: "Book"
    },id) 
    
    const images = await firstValueFrom(getObservable);
    successCallBack();
   
    var response =  images.productImage.map((item)=>{

      const newimage= new productImage();
      newimage.path = PRODUCT_IMAGE_BASE_URL+ item.path;
      newimage.id = item.id;
      newimage.fileName = item.fileName;
      
      return newimage;
    });
    
   
    return response;
            
  }
 async delete(id: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){

  const deleteObservable = this.httpClientService.delete({
    controller: "Book",
    action: "Delete",
    queryString: id.toString()
  }, id)

  if(successCallBack){

    successCallBack();
  }
  else{
    errorCallBack && errorCallBack("Bir hata oluştu sonra tekrar deneyiniz.");
  }

  await firstValueFrom(deleteObservable);
 
 }
  async deleteImages(id: string ,imageId: any, successCallBack: () => void){

    
    const deleteObservable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller: "Book",
      queryString: imageId.toString(),

    }, id, imageId)
   
    await firstValueFrom(deleteObservable);
    successCallBack();
}


async changeShowcaseImage(imageId: string , productId: string, successCallBack: () => void): Promise<void>{

  const changeShowcaseImageObservable = this.httpClientService.get({
    controller: "Book",
    action: "ChangeShowcaseImage",
    queryString: `imageId=${imageId}&productId=${productId}`
  });
 
  console.log("prdctId: " ,productId,"image",productImage,"imageid",imageId);
  
  successCallBack();

  await firstValueFrom(changeShowcaseImageObservable);
                                                                                                                                                                                                                                                                                                                                                                                                

}


}




