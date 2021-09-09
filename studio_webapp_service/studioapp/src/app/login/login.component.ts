import { LoginService } from '../services/login.service';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public msgTrue:boolean=false;
  public msgError:boolean=false;
  public loginsuccess: boolean=false;
  public loginfail:boolean=false;
 


  constructor(private _service: LoginService,
    @Inject(DOCUMENT) private document: Document
    ,private router: Router,
    private cookie:CookieService) { }

  ngOnInit(): void {
  }
  googleLogin(){
    this.cookie.delete('JWT-TOKEN',  "/", window.location.hostname)
    this.document.location.href="/userservice/api/v1/authorize/studio/googlelogin";

  }
  registrationFormSubmit(registrationForm:any){
      console.log(registrationForm);
      const form= { emailid: registrationForm.value.emailid, name: registrationForm.value.name, password: registrationForm.value.password};
     this._service.registerFormSubmitStudio(form).subscribe(
       (data)=> {
         this.msgTrue = true;
         console.log(data);
         registrationForm.reset();
         
       },
       error=>{
         console.log(error);
         this.msgError=true;
       }
     )
   }

 loginFormSubmit(loginForm:any){
  console.log(loginForm);
  this.cookie.delete('JWT-TOKEN',  "/", window.location.hostname)
  const form={ emailid: loginForm.value.emailid, password: loginForm.value.password};
  this._service.loginFormStudioSubmit(form).subscribe(
    (data)=>{
      console.log("Data is ",data);
      this.cookie.set('JWT-TOKEN',data, {path:"/"});
      this.loginsuccess=true;
      loginForm.reset();
      this.router.navigateByUrl("/home/domains");
    },
  error=>{
    console.log("error is ",error);
    this.loginfail=true;
  }

  )
}

}

