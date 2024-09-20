import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from  '../../../../contracts/list_product';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { ProductService } from '../../../../services/common/models/product.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent implements OnInit{

  constructor(spinner: NgxSpinnerService,private productService: ProductService, private alertifyService: AlertifyService){
    super(spinner)
  }

  displayedColumns: string[] = ['Name', 'Price', 'StockCode', 'Manufacturer'];
  dataSource: MatTableDataSource<List_Product>= new MatTableDataSource<List_Product>();
  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

 
  async ngOnInit() {
    this.showSpinner(SpinnerType.CubeTransition);
    const allProducts: List_Product[]= await this.productService.read(()=> this.hideSpinner(SpinnerType.BallSpinClockWise), errorMessage => 
    this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))
    this.dataSource = new MatTableDataSource<List_Product>(allProducts);  
   
    
  }
  
}
