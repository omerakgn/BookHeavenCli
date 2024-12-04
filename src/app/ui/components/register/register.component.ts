import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
constructor(private formBuilder: FormBuilder){}
 

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

onSubmit(user: User){
this.submitted = true;

if(this.form.invalid){
  return;
}

}
}