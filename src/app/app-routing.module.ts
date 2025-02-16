import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';
import { authGuard } from './guards/common/auth.guard';

const routes: Routes = [
  
  {
    path: "admin", component:LayoutComponent,children: [
    {path: "products", loadChildren: () => import("./admin/components/products/products.module").then
      (module => module.ProductsModule),canActivate: [authGuard]},  
    {path: "users", loadChildren: () => import("./admin/components/users/users.module").then  
      (module => module.UsersModule),canActivate: [authGuard]},   
      {path: "create", loadChildren: () => import("./admin/components/create/create.module").then
        (module => module.CreateModule),canActivate: [authGuard]},  
  ], canActivate: [authGuard]
},
  {path: "", component: HomeComponent },
  //{path: "baskets", loadChildren: () => import("./ui/components/baskets/baskets.module").then(module => module.BasketsModule)},
  {path: "products", loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule)},
  {path: "register", loadChildren: () => import("./ui/components/register/register.module").then(module => module.RegisterModule)},
  {path: "login", loadChildren: () => import("./ui/components/login/login.module").then(module => module.LoginModule)},
  {path: "book", loadChildren: () => import("./ui/components/book/book.module").then(module => module.BookModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
 