import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../../app/app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public service:AppService) { }
  loginForm: FormGroup;

  ngOnInit() {
    this.buildNewsletterForm();
  }

  buildNewsletterForm() {
    this.loginForm = new FormGroup({
      "email": new FormControl('', ([Validators.pattern((/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/)), Validators.maxLength(30)])),
    })
  }
  getStarted(data){
    if(data.email.length){
      this.service.showSuccess("You are now part of our team!")
    }
    else{
      this.service.toastErr("Please provide email address");
    }
    // if(this.loginForm.email.lenth)
  }
}
