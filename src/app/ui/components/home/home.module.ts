import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { LayoutUIModule } from '../layout/layoutUI.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    LayoutUIModule,
    RouterModule.forChild([
      {path:"", component: HomeComponent}
    ]),
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }