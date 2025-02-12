import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../layout/footer/footer.component';
import { LayoutUIModule } from '../layout/layoutUI.module';



@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
          {path:"", component: BookComponent}
        ]),
        LayoutUIModule
      ]
})
export class BookModule { }
