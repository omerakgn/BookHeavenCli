import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { LayoutUIModule } from '../layout/layoutUI.module';
import { ListModule } from './list/list.module';

@NgModule({
  declarations: [
    ProductsComponent,
    
  ],
  imports: [
    CommonModule,
    LayoutUIModule,
    RouterModule.forChild([
      {path:"", component: ProductsComponent}
    ]),
    ListModule
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
