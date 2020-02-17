import { Component, OnInit, EventEmitter, Output, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppService} from '../../app/app.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  
})
@Injectable()
export class HomePageComponent implements OnInit {
  @Output() emmiterService: EventEmitter<any> = new EventEmitter();

  public products:any;
  responseData: any;
  isDisabled:boolean=true;
  isLoggedIn:boolean=false;
  userId:string;
  
  constructor( public service: AppService,public router:Router) { }

  ngOnInit() {
    console.log("fkhfkh")
    this.getProductList();
    this.emmiterService.emit("LOGIN/REGISTER");
    this.checkLogging();
  }
  checkLogging(){
    if(localStorage.getItem("userId")){
      this.isLoggedIn=true;
      this.userId=localStorage.getItem("userId");
    }
  }

  
  public isWishlist(prodId) {
    if(!localStorage.getItem("userId")){
      this.service.toastErr("Please Login first to Wishlist")
      this.router.navigateByUrl('login');
    }else{
      console.log("value of >>>>>", prodId, this.products)
      this.isDisabled ? this.service.showSuccess("Added to Wishlist") : this.service.showSuccess("Removed from Wishlist")
      this.isDisabled = !this.isDisabled;

      /////////////wishlust logic///////////

      this.products[Number(prodId)-1].wishlistedUsers.push({id:Number(localStorage.getItem("userId")),isWishlist:true});
      console.log("DATA BEFORE UPDATION>>>",this.products)
      this.service.put('product/'+prodId,this.products[Number(prodId)-1]).subscribe(response => {
        console.log("Updated Data >>>>>>>>>>", response)
        if (Object.keys(response).length != 0) {
          this.service.showSuccess("Added to Wishlist")        
        }  
        else {
          this.service.toastErr("Unable to add to wishlist.")
        }
      }, error => {
        this.service.toastErr('Something went wrong.')
  
      })

      //////////////

    }



  }
getProductList(){
  this.service.directGetApi('product').subscribe(response => {
    
    console.log("in API >>>>>>>>>>", response)
    this.responseData = response;
    if (this.responseData.length) {
      this.service.showSuccess("Product list found successfully");
      this.products=this.responseData;
    }

    else {
      console.log("login_err", )
      this.service.toastErr("No product found.")
    }
  }, error => {
    this.service.toastErr('Something went wring')

  })

}

}
