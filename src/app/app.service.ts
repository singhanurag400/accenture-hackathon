import { Injectable, Testability } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";


@Injectable({
  providedIn: 'root'
})
export class AppService {

  token:any;
  _id:any;
  adminId:any;
  

  constructor(private http:HttpClient,private toastr:ToastrService,private spinner: NgxSpinnerService) { }

  baseUrl =  'http://localhost:3000/'
      typeLogin: string;

      private btnLogin="LOGIN/REGISTER";

    setValue(val) {
        this.btnLogin = val;
    }

    getValue() {
        return this.btnLogin ;
    }

postApi(url,data,isHeader){
  let httpOptions
  ((isHeader == 0) ? httpOptions= {headers: new HttpHeaders({ "Content-Type": "application/json"})} : httpOptions = {
headers: new HttpHeaders({
        "Content-Type": "application/json", 
         //"token": localStorage.getItem("token"),
        //  "_id": localStorage.getItem("adminId"),
         })
  })
  return this.http.post((this.baseUrl+ url),data,httpOptions)
}


getApi(url,data,isHeader){
  let httpOptions
  ((isHeader == 0) ? httpOptions= {headers: new HttpHeaders({ "Content-Type": "application/json"})} : httpOptions = {
headers: new HttpHeaders({
        "Content-Type": "application/json", 
         //"token": localStorage.getItem("token"),
        //  "_id": localStorage.getItem("adminId"),
         })
  })
  return this.http.post((this.baseUrl+ url),data,httpOptions)
}

directGetApi(url){
  return this.http.get(this.baseUrl+ url)
}

put(url,data) {
  let httpOptions={headers: new HttpHeaders({ "Content-Type": "application/json"})};
  return this.http.put((this.baseUrl+ url), data, httpOptions)
             
}

showSuccess(msg) {
  this.toastr.success(msg);
}

toastErr(msg) {
this.toastr.error(msg)
}
showLoader(){
  this.spinner.show();
}
hideLoader(){
  this.spinner.hide();
}
waitTillCompletePageLoads(){
  this.spinner.show();
  setTimeout(()=>{
    this.spinner.hide()},1000);

}
}

