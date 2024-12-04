import { Component, EventEmitter, Inject, OnInit, Output, output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/models/product.service';
import { ListProductImage, productImage } from '../../contracts/list_product_image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { DialogService } from '../../services/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.css'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {
  
 
  @Output() optionsChange = new EventEmitter<Partial<FileUploadOptions>>(); 

  public options: Partial<FileUploadOptions>;  
  router: any;
  
  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string ,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService
  ) {
    super(dialogRef);
    this.options= {
      accept: ".png, .jpg, .jpeg, .gif",
      action: "upload",
      controller: "Book",
      explanation: "Ürün resimini seçin veya buraya sürükleyin...",
      isAdminPage: true,
      queryString: this.data.toString(),
    };
    this.optionsChange.emit(this.options);
   
  }
  images: productImage[];
  
  async ngOnInit() {

  this.spinner.show(SpinnerType.CubeTransition);
  this.dialogRef.updateSize('90%', '90%');
  this.images = await this.productService.readImages(this.data as string, ()=>this.spinner.hide(SpinnerType.CubeTransition));
  
}
 

async deleteImage(imageId: any, event: any){
  console.log("image ID select product  "+ imageId);
  this.dialogService.openDialog({
    componentType: DeleteDialogComponent,
    data: DeleteState.Yes,
    afterClosed: async () => {     
      this.spinner.show(SpinnerType.CubeTransition)
      if(this.options.queryString)

     
      await this.productService.deleteImages(this.data as string, imageId, () => {
        this.spinner.hide(SpinnerType.CubeTransition);
        var card = $(event.srcElement).parent().parent();
        
        card.fadeOut(500);
      
      });
     this.ngOnInit();
    }
  })
}

  

}

export enum SelectProductImageState{
  Close
}