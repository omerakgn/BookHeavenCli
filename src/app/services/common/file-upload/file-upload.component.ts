import { Component, Input, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../../base/base.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { DialogService } from '../../dialog.service';
import { FileUploadDialogComponent, FileUploadDialogState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent{

  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService) { }


    public files: NgxFileDropEntry[];

    @Input() options: Partial<FileUploadOptions>;
  
    public selectedFiles(files: NgxFileDropEntry[]) {
      this.files = files;
      const fileData: FormData = new FormData();
      for (const file of files) {
        (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
          fileData.append(_file.name, _file, file.relativePath);
        });
      }

      this.dialogService.openDialog({
        componentType: FileUploadDialogComponent,
        data: FileUploadDialogState.Yes,
        afterClosed: () =>{
          this.spinner.show(SpinnerType.BallSpinClockWise)
          if(this.options.queryString)
            console.log("ACTION : ",this.options.controller),
          fileData.set("id", this.options.queryString)
          this.httpClientService.post({
            controller: this.options.controller,
            action: this.options.action,
            queryString: this.options.queryString,
              headers: new HttpHeaders({ "responseType": "blob" })
            }, fileData).subscribe(data => {
              
              const message: string = "Dosyalar başarıyla yüklenmiştir.";
    
              this.spinner.hide(SpinnerType.BallSpinClockWise);
              if (this.options.isAdminPage) {
                this.alertifyService.message(message,
                  {
                    dismissOthers: true,
                    messageType: MessageType.Success,
                    position: Position.TopRight
                  })
                  
              } else {
                this.customToastrService.message(message, "Başarılı.", {
                  messageType: ToastrMessageType.Success,
                  position: ToastrPosition.TopRight 
                })
              }
    
    
            }, (errorResponse: HttpErrorResponse) => {
              
              console.log("ERRORRRR :" , errorResponse);
              const message: string = "Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşılmıştır.";
    
              this.spinner.hide(SpinnerType.BallSpinClockWise)
              if (this.options.isAdminPage) {
                this.alertifyService.message(message,
                  {
                    dismissOthers: true,
                    messageType: MessageType.Error,
                    position: Position.TopRight
                  })
              } else {
                this.customToastrService.message(message, "Başarsız.", {
                  messageType: ToastrMessageType.Error,
                  position: ToastrPosition.TopRight
                })
              }
    
            });


        }
      })
          
        
    
    }
  

  }
export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}