import { Directive, ElementRef, EventEmitter, HostListener, inject, Input, Output, Renderer2 } from '@angular/core';
import { HttpClientService } from '../../services/common/http-client.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../base/base.component';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';

declare var $: any;


@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective extends BaseComponent  {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClient: HttpClientService,
    private alertifyService: AlertifyService,
    spinner: NgxSpinnerService,) 
  {
    super(spinner)
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/deleteimg.png");
    img.setAttribute("style", "cursor: pointer; width: 30px: height: 30px;");
    img.width= 25;
    img.height= 25;
    _renderer.appendChild(element.nativeElement, img);

  }

  @Input() id : string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick(){
    this.openDialog(async () => {
      this.showSpinner(SpinnerType.CubeTransition);
      const td: HTMLTableCellElement = this.element.nativeElement;
      this.httpClient.delete({
        controller: this.controller,
  
      },this.id).subscribe(data => {
        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toggle",
        }, 700,()=> {
          this.callback.emit();
          this.alertifyService.message("Ürün başarıyla silinmiştir",{
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          } )
        } );
      });
    })
   
  }
  readonly dialog = inject(MatDialog);
  openDialog(afterClosed: any) : void{
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      width: '250px',
      data: DeleteState.Yes,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result== DeleteState.Yes)
        afterClosed();
    })

  }
}
