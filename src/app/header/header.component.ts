import { Component, OnInit, ElementRef } from '@angular/core';
import { HtmlTagDefinition } from '@angular/compiler';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  mySidebar:HTMLElement;
  isLoggedIn:String;

  ngOnInit() {
    this.LoggedIn();
  }

  

w3_open() {
  this.mySidebar=document.getElementById("mySidebar") as HTMLElement;
  if (this.mySidebar.style.display === 'block') {
    this.mySidebar.style.display = 'none';
  } else {
    this.mySidebar.style.display = 'block';
  }
}

// Close the sidebar with the close button
w3_close() {
    this.mySidebar.style.display = "none";
}
LoggedIn(){
  console.log("HEADER PAGE",localStorage.getItem('userId'))
  if(!localStorage.getItem('userId')){
   this.isLoggedIn="LOGIN/REGISTER"
  }
  else{
    this.isLoggedIn=''
  }

}

}
