import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ToastrModule } from '../../node_modules/ngx-toastr';
import { CategoryComponent } from './category/category.component';
import { AppService } from './app.service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule, ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    CategoryComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [AppService,HomePageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
