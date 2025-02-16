import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from "../services/common/file-upload/file-upload.module";
import {MatCard, MatCardModule} from '@angular/material/card';
import { UpdateDialogComponent } from './update-dialog/update-dialog/update-dialog.component';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    UpdateDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FileUploadModule,
    MatCardModule,
    
]
})
export class DialogModule { }
