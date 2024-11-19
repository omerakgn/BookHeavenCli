import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AppComponent } from '../../../app.component';
import { DeleteDirectiveModule } from '../../../directives/admin/delete.directive.module';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogModule } from '../../../dialogs/dialog.module';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';

@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component: ProductsComponent}
    ]),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    DeleteDirectiveModule,
    MatDialogModule,
    DialogModule,
    FileUploadModule,
    
  ],
  bootstrap: [AppComponent]
  
})
export class ProductsModule { }
