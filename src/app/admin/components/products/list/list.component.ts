import { afterNextRender, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from  '../../../../contracts/list_product';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { ProductService } from '../../../../services/common/models/product.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { CustomToastrService } from '../../../../services/ui/custom-toastr.service';
import { DialogService } from '../../../../services/dialog.service';
import { SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { DeleteDialogComponent, DeleteState } from '../../../../dialogs/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent extends BaseComponent implements OnInit{

  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService,
    private dialogService: DialogService,
  ){
    super(spinner);
  }
    
  Listdata!: Product[];
  dataSource= new MatTableDataSource<Product>();
  totalProductCount: number;

   getProduct(){
    
    this.productService.get(() => this.hideSpinner(SpinnerType.BallSpinClockWise), () => 
      this.alertify.message("Veriler Yüklenemedi",{
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopCenter
      } )).subscribe(data => {
        this.Listdata = data.books;     
        this.dataSource.data=this.Listdata;
        this.totalProductCount = data.totalProductCount;

      })  
  }

  addProductImages(id: string){
   this.dialogService.openDialog({
    componentType: SelectProductImageDialogComponent,
    data: id,
    options: {
      Width: "1400px"
    }
   })
  
  }
  deleteProduct(id: string){
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {     
     this.showSpinner(SpinnerType.CubeTransition);
       await this.productService.delete(id.toString(),()=> {
        this.hideSpinner(SpinnerType.CubeTransition);
       });
       this.ngOnInit();
      }
    })
  }

  displayedColumns: string[] = ['Name', 'Price', 'StockCode', 'Manufacturer','photos','Delete'];
  
   ngOnInit() {  

   this.getProduct();      

  }
  
}
