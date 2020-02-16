import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../../app/app.service';

declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
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
      "name": new FormControl('', ([Validators.required, Validators.pattern((/^([a-zA-Z]{0,29})$/)), Validators.maxLength(30)])),
      "password": new FormControl('', ([Validators.required, Validators.maxLength(16), Validators.minLength(8)])),
      "confirmPassword": new FormControl('', ([Validators.required])),
      "remeberMe": new FormControl(false)
    })
  }




  alreadyLogged(){
        if(localStorage.getItem("userId"))
          this.router.navigateByUrl('homepage');
  }



  //...........login

  login(data) {
    this.service.showLoader();
    let tempLogin = {
      "email": data.email,
      "password": data.password
    }
    this.service.directGetApi('users?q='+data.email).subscribe(userAlready=>{
      if(Object.keys(userAlready).length){
        this.service.toastErr('Email Id already exists.')
      }
      else{
        let registerData={
          name:data.name,
          email:data.email,
          password:data.password
        }

      
    this.service.postApi('users',registerData,0).subscribe(registerSucc => {
    
      
      if(Object.keys(registerSucc).length){
        this.service.showSuccess('Registered successfully');
        localStorage.setItem('userId',registerSucc['id']);
        this.service.hideLoader();
        this.router.navigateByUrl('homepage')
      }
      else{
        this.service.toastErr('Registration unsuccessfull.');
        

      }
    
    }, error => {
      this.service.toastErr('Something went wring')

    })
  }
})

  }
}

