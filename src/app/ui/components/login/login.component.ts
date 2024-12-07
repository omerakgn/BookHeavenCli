import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/common/models/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends BaseComponent implements OnInit {
constructor(private formBuilder: FormBuilder,private  userService: UserService,spinner: NgxSpinnerService){
  super(spinner);
}
  
form: FormGroup;

ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:["",[
        Validators.required,
        Validators.email,
      ]],
      password:["",[
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(7),
      ]]
      
    })   
  }

  get component(){
    return this.form.controls;
  }

  submitted: boolean = false;
  onSubmit(data: any){
    this.submitted = true;
    
    if(this.form.invalid){
      return;
    }
    
    }

    async login(Email: string, Password: string){
      this.showSpinner(SpinnerType.BallSpinClockWise);
      await this.userService.login(Email,Password, () => this.hideSpinner(SpinnerType.BallSpinClockWise));
    }

}
