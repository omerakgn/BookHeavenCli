import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { LayoutUIModule } from './layout/layoutUI.module';
import { BookModule } from './book/book.module';





@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    HomeModule,
    RegisterModule,
    LoginModule,
    LayoutUIModule,
    BookModule,
    
  ],
  exports:[
    LayoutUIModule,
  ]
})
export class ComponentsModule { }
