import { afterNextRender, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { List_Product } from  '../../../../contracts/list_product';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { ProductService } from '../../../../services/common/models/product.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { CustomToastrService } from '../../../../services/ui/custom-toastr.service';
import { DialogService } from '../../../../services/dialog.service';
import { SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';


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
    private dialogService: DialogService
  ){
    super(spinner);
  }
    
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  
  Listdata!: List_Product[];
  dataSource= new MatTableDataSource<List_Product>();
 

   getProduct(){
    
    this.productService.get(() => this.hideSpinner(SpinnerType.BallSpinClockWise), () => 
      this.alertify.message("Veriler Yüklenemedi",{
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopCenter
      } )).subscribe(data => {
      
      this.Listdata = data.books;     
      this.dataSource.data=this.Listdata;
    } )
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

  displayedColumns: string[] = ['Name', 'Price', 'StockCode', 'Manufacturer','photos','Edit','Delete'];
  
  async ngOnInit() {
  
   
   this.getProduct();
   
    
  }
  
}
