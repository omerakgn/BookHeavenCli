import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { LayoutUIModule } from '../../layout/layoutUI.module';
import { ListComponent } from './list.component';



@NgModule({
  declarations: [
    ListComponent
  ],
 
  imports: [
    CommonModule,
    RouterModule.forChild([
          {path:"", component: ListComponent}
        ]),
        LayoutUIModule
      ],
      exports: [
        ListComponent
      ],
})
export class ListModule { }
