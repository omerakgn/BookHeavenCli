import { Injectable } from '@angular/core';
import { AnimationDurations } from '@angular/material/core';
import { DisableTimoutType, ToastrService } from 'ngx-toastr';
import { delay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) { }

  
  message(message: string, title: string, toastrOptions: Partial<ToastrOptions>){
    this.toastr[toastrOptions.messageType|| 'success'](message,title,{
      positionClass: toastrOptions.position,
      disableTimeOut: toastrOptions.disableTimeOut,
    }, );
  }
}
export class ToastrOptions {
  messageType?: ToastrMessageType = ToastrMessageType.Success; // Varsayılan değer
  position?: ToastrPosition = ToastrPosition.BottomRight; // Varsayılan değer
  disableTimeOut?: boolean = false; // Varsayılan değer
}

export enum ToastrMessageType{

  Success="success",
  Info = "info",
  Warning = "warning",
  Error = "error"

}

export enum ToastrPosition{

  TopRight="toast-top-right",
  TopLeft="toast-top-left",
  TopCenter="toast-top-center",
  TopFullWidth="toast-top-full-width",
  BottomRight="toast-bottom-right",
  BottomLeft="toast-bottom-left",
  BottomCenter="toast-bottom-center",
  BottomFullWidth="toast-bottom-full-width",

}