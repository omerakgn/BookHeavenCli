import { Component, OnInit } from '@angular/core';
import { DeleteState } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageType, Position } from '../../../services/admin/alertify.service';
import { AlertifyService } from '../../../services/admin/alertify.service';
import { DialogService } from '../../../services/dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { User, UserResponse } from '../../../contracts/users/user';
import { UserService } from '../../../services/common/models/user.service';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent extends BaseComponent implements OnInit{

  constructor(
    spinner: NgxSpinnerService,
    private userService: UserService,
    private alertify: AlertifyService,
    private dialogService: DialogService,
  ){
    super(spinner);
  }
    
  Listdata!: UserResponse;
  dataSource= new MatTableDataSource<User>();

   getUsers(){
    
    this.userService.get(() => this.hideSpinner(SpinnerType.BallSpinClockWise), () => 
      this.alertify.message("Veriler Yüklenemedi",{
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopCenter
      } )).subscribe(data => {
        this.Listdata = data;     
        this.dataSource.data=this.Listdata.users;
      
        console.log("data   adsda",this.Listdata.users);
        console.log("data   adsda",this.dataSource.data);
      })  
  }
  deleteUser(id: string){
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {     
     this.showSpinner(SpinnerType.CubeTransition);
       await this.userService.delete(id.toString(),()=> {
        this.hideSpinner(SpinnerType.CubeTransition);
       });
       this.ngOnInit();
      }
    })
  }

  displayedColumns: string[] = ['Name', 'Surname', 'Email', 'Role'];
  
   ngOnInit() {  

   this.getUsers();      

  }
  
}
