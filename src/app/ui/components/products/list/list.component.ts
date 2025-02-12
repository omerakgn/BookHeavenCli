import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { Product } from '../../../../contracts/list_product';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { ListProductImage, productImage } from '../../../../contracts/list_product_image';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/ui/custom-toastr.service';
import { FileService } from '../../../../services/common/models/file.service';
import { BaseUrl } from '../../../../contracts/base_url';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent implements OnInit {

  
  constructor(
    private productService: ProductService,
    spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private fileService: FileService,
    private router: Router
    )
  {
    super(spinner);
  }


  totalProductCount: number;
  products: Product[];
  images: ListProductImage[];
  baseUrl: BaseUrl;
  
  async getProduct(){
    
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    console.log("base Url :" , this.baseUrl);
    this.productService.get(() => {this.hideSpinner(SpinnerType.BallSpinClockWise)}, () => 
      this.toastrService.message("Veriler Yüklenemedi" , "Hata !",{
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopCenter
      } )).subscribe(data => {

        this.products = data.books;    
        this.totalProductCount = data.totalProductCount;
        console.log("products: ", data);
        this.products = this.products.map<Product>(p => {
       
        console.log("prdct img: " , p.productImages);
          const listProduct: Product = {
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
       
          return  listProduct;
        })
        
       
        console.log("count : " ,data.totalProductCount);
      });
    
      
  }

  sendProduct(id: number){
    this.router.navigate(['../book', {id:id}])
  }


  ngOnInit() {
   this.getProduct();
      
  }
  


}
