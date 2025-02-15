import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../layout/footer/footer.component';
import { LayoutUIModule } from '../layout/layoutUI.module';
import { CommentComponent } from './book-comments/comment/comment.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BookComponent,
    CommentComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
          {path:"", component: BookComponent}
        ]),
        LayoutUIModule,
        FormsModule
      ],
      
})
export class BookModule { }
