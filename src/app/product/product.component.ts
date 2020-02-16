
import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../../app/app.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss',]
})

export class ProductComponent implements OnInit {
  params: any;
  productData: any;
  productImages: String;
  Quantity: FormGroup;
  quantityInput:Number=1;
  isDisabled: boolean = true;
  isAddToCart: boolean = true;
  public loading = false;

  constructor(private route: ActivatedRoute, public service: AppService, public router: Router, private elementRef: ElementRef, @Inject(DOCUMENT) private doc) {
    this.route.params.subscribe(params => this.params = params);
  }

  ngOnInit() {
    this.service.waitTillCompletePageLoads();

    this.loadScript();
    setTimeout(()=>{
      this.loadScript1();},500) 
   
    setTimeout(()=>{
      this.loadScript2();},1000) 
    this.getProduct();
    this.quantityUneditable();
    $(".heart.fa").click(function () {
      $(this).toggleClass("fa-heart fa-heart-o");
    });
  }



  public getProduct() {
    this.service.directGetApi('product/' + this.params.id).subscribe(response => {
      console.log("One Product Data >>>>>>>>>>", response)
      if (Object.keys(response).length != 0) {
        this.service.showSuccess("Product list found successfully");
        this.productData = response;
        this.productImages = response['imageSrc'];
        response['users'].forEach(element => {
          console.log("ELEMENT",element)
          if(Number(element['id'])==Number(localStorage.getItem("userId")))
          this.isAddToCart=false;
        });
        // this.isAddToCart = !response["users"];
      }

      else {
        this.service.toastErr("Product details not found.")
      }
    }, error => {
      this.service.toastErr('Something went wrong.')

    })

  }

  public loadScript() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = '../../assets/js/jquery-3.2.1.min.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  public loadScript1() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = '../../assets/plugins/flexslider/jquery.flexslider-min.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);

  }
  public loadScript2() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = '../../assets/js/product.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  public quantityUneditable() {
    $("#quantity").keypress(function (evt) {
      evt.preventDefault();
      $(document).keydown(function (e) {
        var elid = $(document.activeElement).hasClass('textInput');
        if (e.keyCode === 8 && !elid) {
          return false;
        };
      });
    });
  }
  public isWishlist() {
    console.log("value of >>>>>", this.isDisabled)
    this.isDisabled ? this.service.showSuccess("Added to Wishlist") : this.service.showSuccess("Removed from Wishlist")
    this.isDisabled = !this.isDisabled;


  }

  public addToCart() {

    if (!this.isAddToCart) {
      this.router.navigateByUrl('cart');
    }
    else {
      
      console.log("quantityInput",this.quantityInput)
      this.productData.users.push({id:Number(localStorage.getItem("userId")),quantity:this.quantityInput});
      console.log("DATA BEFORE UPDATION>>>",this.productData)
      this.service.put('product/'+this.params.id,this.productData).subscribe(response => {
        console.log("Updated Data >>>>>>>>>>", response)
        if (Object.keys(response).length != 0) {
          this.service.showSuccess("Added to cart.");
          this.isAddToCart = !this.isAddToCart;      
        }
  
        else {
          this.service.toastErr("Unable to add to cart.")
        }
      }, error => {
        this.service.toastErr('Something went wrong.')
  
      })
      

    }



  }

}
