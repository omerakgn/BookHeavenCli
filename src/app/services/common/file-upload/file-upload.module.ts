import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule} from 'ngx-file-drop'
import { FileUploadDialogComponent } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    FileUploadComponent,
    FileUploadDialogComponent
    
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    MatDialogModule,
    MatButton
  ],
  exports:[
    FileUploadComponent,

    
  ]
})
export class FileUploadModule { }
