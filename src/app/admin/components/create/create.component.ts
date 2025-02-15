import { Component, OnInit, Output } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import { ProductService } from '../../../services/common/models/product.service';
import { Create_Product } from '../../../contracts/create_product';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { ListComponent } from '../products/list/list.component';
import { Router } from '@angular/router';
import { EventEmitter } from 'stream';
import { FileUploadOptions } from '../../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent extends BaseComponent implements OnInit{

 

 constructor(spiner: NgxSpinnerService ,private productService: ProductService, private alertify: AlertifyService, private router: Router) {
  super(spiner);
  
 }

  ngOnInit(): void {
    
  }
 


  create(
    name: HTMLInputElement | HTMLTextAreaElement,
    description: HTMLTextAreaElement,
    price: HTMLInputElement,
    stockCode: HTMLInputElement,
    manufacturer: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallSpinClockWise);
    const create_product: Create_Product = new Create_Product();
    create_product.Name= name.value;
    create_product.Description=description.value
    create_product.Price = parseFloat(price.value);
    create_product.StockCode = stockCode.value;
    create_product.Manufacturer = manufacturer.value;


    if(!name.value){
      this.alertify.message("Lütfen ürün adını giriniz!", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight

      });
      return;
    }
    if(!description.value){
      this.alertify.message("Lütfen ürün açıklamasını giriniz!", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight

      });
      return;
    }
    if(parseInt(price.value)<0 ){
      this.alertify.message("Lütfen ürün fiyat bilgisini doğru giriniz!", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight

      });
      return;
    }
    if(!stockCode.value){
      this.alertify.message("Lütfen ürün Stok kodunu giriniz!", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight

      });
      return;
    }
    if(!manufacturer.value){
      this.alertify.message("Lütfen yazar adını giriniz!", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight

      });
      return;
    }
  
    
    
    this.productService.create(create_product, ()=> {
      this.hideSpinner(SpinnerType.BallSpinClockWise);
        this.alertify.message("Ürün başarıyla eklenmiştir.",{
          dismissOthers: true,
          messageType:MessageType.Success,
          position: Position.TopRight,
        },);

      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/products']); 
      });
        
    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        }
      );
    },
    

    );
    
  }
}
