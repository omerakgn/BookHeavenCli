import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
declare var alertify: any;


@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() {
 
  }

  message(message: string, options: Partial<AlertifyOptions>)
  {
    
    alertify.set('notifier','delay',options.delay =3 );  
    alertify.set('notifier','position', options.position = Position.BottomRight);
    const msj = alertify[options.messageType || MessageType.Message] (message);
    if(options.dismissOthers){
      msj.dismissOthers();
    }

  }
}

export class AlertifyOptions{

  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomRight;
  delay : number = 3;
  dismissOthers: boolean = false;
}


export enum MessageType{

  Error="error",
  Message="message",
  Notify="notify",
  Success="success",
  Warning="warning"

}

export enum Position {

  TopCenter ="top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}
