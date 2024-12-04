import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
constructor(private formBuilder: FormBuilder){}
  
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


}
