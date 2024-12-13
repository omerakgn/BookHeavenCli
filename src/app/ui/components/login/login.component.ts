import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/common/models/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../services/common/models/userauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends BaseComponent implements OnInit {
constructor(
  private formBuilder: FormBuilder,
  private  userService: UserService,
  private userAuthService: UserAuthService,
  spinner: NgxSpinnerService,
  private authService: AuthService,
  private activatedRoute:  ActivatedRoute,
  private router: Router
){
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
      await this.userAuthService.login(Email,Password, () => {
        this.authService.identityCheck();

        this.activatedRoute.queryParams.subscribe(params => {
          const returnUrl: string = params["returnUrl"];
          if(returnUrl){
            this.router.navigate([returnUrl]);
          }else{
            this.router.navigate([""]);
          }
        })
        this.hideSpinner(SpinnerType.BallSpinClockWise);

      });
    }

}
