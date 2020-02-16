import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../../app/app.service';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  user: any;

  remberMe: any = [];
  token: any;
  loginForm: FormGroup;

  responseData: any = {};
  // router: any;


  constructor(public router: Router, public service: AppService) { }

  ngOnInit() {
    this.alreadyLogged();
    // this.route.params.subscribe(res => {
    //   console.log(JSON.stringify(res))
    // },err =>{
    //   console.log(err)
    // })
     this.buildLoginForm()
    // $(function () {
    //   $('#email,#password').on('keypress', function (e) {
    //     if (e.which == 32)
    //       return true;
    //   });
    // });
  }

  buildLoginForm() {
    this.loginForm = new FormGroup({
      "email": new FormControl('', ([Validators.required, Validators.pattern((/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/)), Validators.maxLength(50)])),
      "password": new FormControl('', ([Validators.required, Validators.maxLength(16), Validators.minLength(8)])),
    })
  }

  alreadyLogged(){
    if(localStorage.getItem("userId"))
      this.router.navigateByUrl('homepage');
}







  //...........login

  login(data) {
       this.service.directGetApi(`users?email=${data.email}&password=${data.password}`).subscribe(users=>{
      if(Object.keys(users).length){
        
        this.service.showSuccess("Logged in successfully");
        localStorage.setItem("userId",users[0]['id']);
        this.service.setValue("")
        this.router.navigateByUrl('homepage');
      }
      else{
        this.service.toastErr("Invalid Credentials!");
      }
    })

  }
}

