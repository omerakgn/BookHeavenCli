import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { ProductService } from '../../../services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { FileService } from '../../../services/common/models/file.service';
import { Product } from '../../../contracts/list_product';
import { ListProductImage, productImage } from '../../../contracts/list_product_image';
import { BaseUrl } from '../../../contracts/base_url';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../services/common/auth.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent  extends BaseComponent implements OnInit{

  constructor( 
    private productService: ProductService,
      spinner: NgxSpinnerService,
      private toastrService: CustomToastrService,
      private fileService: FileService,
      private route: ActivatedRoute,
      private authService: AuthService,
    )
      {
  super(spinner);
  }

  totalProductCount: number;
  products: Product;
  images: ListProductImage[];
  baseUrl: BaseUrl;

  async getProduct(){
    const bookid = this.route.snapshot.paramMap.get("id") || "" ;
    console.log("bookid : ",bookid);
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    console.log("base Url :" , this.baseUrl);
    this.productService.getById(() => {this.hideSpinner(SpinnerType.BallSpinClockWise)}, () => 
      this.toastrService.message("Veriler Yüklenemedi" , "Hata !",{
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopCenter
      } ),bookid?.toString()).subscribe(data => {

        console.log("api yanıtı : ", data);

        const p = data.book;

        this.products = {
          id: p.id,
          name: p.name,
          price: p.price,
          stockCode: p.stockCode,
          manufacturer: p.manufacturer,
          description: p.description,
          productImages: p.productImages.filter((img: productImage) => img.showcase === true ),
          path:  p.productImages
          .find((img: productImage) => img.showcase === true)?.path || "",


        };
        
       console.log("product image ", this.products.productImages);
        return this.products;
 
  
      });
  }

  get getCurrentUser(){
    return this.authService.getUser();

  }
  ngOnInit() {
   this.getProduct();
  }

}
