import { afterNextRender, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { List_Product } from  '../../../../contracts/list_product';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { ProductService } from '../../../../services/common/models/product.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { CustomToastrService } from '../../../../services/ui/custom-toastr.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent extends BaseComponent implements OnInit{

  constructor(spinner: NgxSpinnerService,private productService: ProductService, private toastrService: CustomToastrService){
    super(spinner);
    
}
  
  Listdata!: List_Product[];
  dataSource= new MatTableDataSource<List_Product>();
 

   getProduct(){
    this.showSpinner(SpinnerType.BallSpinClockWise);

    this.productService.get(() => this.hideSpinner(SpinnerType.BallSpinClockWise), errorMessage => this.toastrService.message).subscribe(data => {
      this.Listdata = data.data
      this.dataSource.data=this.Listdata;
      console.log('list of datas', this.Listdata)
    }
    
    )
    
  }

  displayedColumns: string[] = ['Name', 'Price', 'StockCode', 'Manufacturer'];
  
  async ngOnInit() {
    
   this.getProduct();
   
    
  }
  
}
