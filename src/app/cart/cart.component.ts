import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app/app.service'
import { element } from 'protractor';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts: any;
  getData: any;
  matchedData: any = [];
  totalCartAmount: number = 0;
  previousAmount: number = 0;
  subTotal:Number=0;
  coupon: String = "";
  orderId:String="";
  orderPlaced:Boolean=false;
  appliedCoupon: Boolean = false;
  couponError: Boolean = false;

  constructor(public service: AppService, ) { }

  ngOnInit() {
    this.getCart();
  }
  getCart() {
    this.service.directGetApi('product').subscribe((cartProduct) => {
      this.cartProducts = this.matchedData = [];
      this.totalCartAmount = 0;
      this.getData = cartProduct;
      this.getData.forEach(element => {
        element['users'].forEach(key => {
          if (key['id'] == Number(localStorage.getItem('userId'))) {
            element.quantity = key["quantity"];
            this.matchedData.push(element);
            this.subTotal=this.totalCartAmount += (element.price * key.quantity);
            // Object.assign(this.subTotal,this.totalCartAmount)

            console.log("MATCHED", this.matchedData)
          }

        });

      });
      this.cartProducts = this.matchedData;
      console.log("LENGHTH>>", this.cartProducts.length)

    })


  }
  removeFromCart(productId) {
    console.log("PRODI", productId);
    this.service.directGetApi('product/' + productId).subscribe((prodRes) => {
      if (Object.keys(prodRes).length) {
        prodRes["users"] = prodRes["users"].filter(obj => !(obj.id == Number(localStorage.getItem("userId"))));
        console.log("prodRES____", prodRes)
        this.service.put('product/' + productId, prodRes).subscribe(updatedData => {
          if (Object.keys(updatedData).length) {
            this.getCart();
            
            this.service.showSuccess("Removed from cart");

          }
          else {
            this.service.toastErr("Error while removing.")
          }
        })

      }
      else {
        this.service.toastErr("Error while removing.")
      }
    })
  }

  getPrice(amount: number) {
    this.totalCartAmount -= this.previousAmount;
    this.previousAmount = amount;
    this.totalCartAmount += amount;

    // this.totalCartAmount+=Number(amount);
    console.log("AMOUNT>>>>>>", this.totalCartAmount)

  }

  applyCoupon() {
    if (this.coupon !== "ANRG")
      this.couponError = true
    else if (!this.appliedCoupon) {
      this.couponError = false
      this.appliedCoupon = true;
      this.totalCartAmount=(this.totalCartAmount-(this.totalCartAmount/10))
      //Math.round(this.totalCartAmount);
    }
    

  }

  removeCoupon() {
    this.couponError = false
    this.appliedCoupon = false;
    this.totalCartAmount=(this.totalCartAmount*10)/9;
    

  }

  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
      locale: 'auto',
      token: function (token: object) {
        this.orderPlaced=true;
        this.cartProducts=0;
        this.couponError = true;
        this.orderId=token['id'].toString().slice(4,20);
        console.log("token comes",this.cartProducts,this.orderId,token)
      }
    });

    handler.open({
      name: 'Shopping App',
      description: this.cartProducts.length + " Products Buying",
      amount: 1000.0205
    });

  }
}
