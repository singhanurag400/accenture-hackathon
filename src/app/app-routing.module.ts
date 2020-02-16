import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {ProductComponent} from './product/product.component';
import {CartComponent} from './cart/cart.component';
import {CategoryComponent} from './category/category.component';
import {LoginComponent } from './login/login.component'
import {RegisterComponent } from './register/register.component'
import { registerLocaleData } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch:'full' },
  { path: 'homepage', component: HomePageComponent },
  {path:'product/:id',component:ProductComponent},
  {path:'cart',component:CartComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'category',component:CategoryComponent},
  { path: '**', redirectTo: '/homepage' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }