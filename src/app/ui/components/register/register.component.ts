import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../contracts/users/user';
import { UserService } from '../../../services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { Create_User } from '../../../contracts/users/create_user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
constructor(
  private formBuilder: FormBuilder ,
  private userService: UserService,
  private toastrService: CustomToastrService,
  private router: Router
  ){}
 

form: FormGroup;
ngOnInit(): void {
  this.form = this.formBuilder.group({
    name: ["",[
      Validators.required,
      Validators.maxLength(25),
      Validators.minLength(3),
    ]],
    surname: ["",[
      Validators.required,
      Validators.maxLength(25),
      Validators.minLength(3),
    ]],
    email: ["",[
      Validators.required,
      Validators.maxLength(250),
      Validators.email
    ]],
    password: ["",[
      Validators.required,
      Validators.maxLength(100),
      Validators.minLength(7),
    ]],
    checkbox:[false],
  })
}
get component(){
  return this.form.controls;
}

submitted: boolean = false;


async onSubmit(user: User){
  this.submitted = true;

  if(this.form.invalid){
  return;
  }

  const result: Create_User = await this.userService.create(user);
    if (result.success){
      this.toastrService.message(result.message, "Kullanıcı Kaydı Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    this.router.navigate(["/login"]);
  }
    else{
      this.toastrService.message(result.message, "Hata", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
    }

}
}