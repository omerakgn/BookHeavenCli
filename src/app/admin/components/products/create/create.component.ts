import { Component, OnInit, Output } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { Create_Product } from '../../../../contracts/create_product';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { ListComponent } from '../list/list.component';
import { Router } from '@angular/router';
import { EventEmitter } from 'stream';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';

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
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action:   "upload",
    controller: "Book",
    explanation: "Resimleri sürükleyin veya seçin...",
    isAdminPage: true,
    accept: ".png, .jpg, .jpeg" 
  }



  create(Name:HTMLInputElement,Description:HTMLInputElement,Price:HTMLInputElement,StockCode:HTMLInputElement,Manufacturer:HTMLInputElement,Image:HTMLInputElement){
    this.showSpinner(SpinnerType.BallSpinClockWise);
    const create_product: Create_Product = new Create_Product();
    create_product.Name= Name.value;
    create_product.Description=Description.value
    create_product.Price = parseFloat(Price.value);
    create_product.StockCode = StockCode.value;
    create_product.Manufacturer = Manufacturer.value;
    create_product.PrdImage = Image.value;


    if(!Name.value){
      this.alertify.message("Lütfen ürün adını giriniz!", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight

      });
      return;
    }
    if(!Description.value){
      this.alertify.message("Lütfen ürün açıklamasını giriniz!", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight

      });
      return;
    }
    if(parseInt(Price.value)<0 ){
      this.alertify.message("Lütfen ürün fiyat bilgisini doğru giriniz!", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight

      });
      return;
    }
    if(!StockCode.value){
      this.alertify.message("Lütfen ürün Stok kodunu giriniz!", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight

      });
      return;
    }
    if(!Manufacturer.value){
      this.alertify.message("Lütfen yazar adını giriniz!", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight

      });
      return;
    }
    if(!Image.value){
      this.alertify.message("Lütfen resim kısmını doldurunuz!", {
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
        // Burada '/list' hedef route'un olmalı
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/products']); // Burada hedef componentin route'u yazı
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
