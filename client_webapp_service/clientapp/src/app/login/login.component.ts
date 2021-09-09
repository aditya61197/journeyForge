// import { DOCUMENT } from '@angular/common';
// import { Inject } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';

// import { FormSubmitService } from '../services/form-submit.service';
// import { CustomFieldValidateDirective } from './custom-field-validate.directive';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   public msgTrue:boolean=false;
//   public msgError:boolean=false;
//   public loginsuccess: boolean=false;
//   public loginfail:boolean=false;


//   constructor(@Inject(DOCUMENT) private document: Document,
//   private router: Router,
//   private _service:FormSubmitService, private cookie:CookieService
//  ) {

//   }


//   ngOnInit(): void {

//   }
//   googleLogin(){
//     this.document.location.href="/userservice/api/v1/authorize/client/googlelogin";
//   }

//   loginFormSubmit(loginForm:any){
//     console.log(loginForm);
//     const form={ emailid: loginForm.value.emailid, password: loginForm.value.password};
//     this._service.loginFormClientSubmit(form).subscribe(
//       (data)=>{
//         console.log("Data is ",data);
//         this.cookie.set('JWT-TOKEN',data);
//         this.loginsuccess=true;
//         this.router.navigateByUrl("/home");
//       },
//     error=>{
//       console.log("error is ",error);
//       this.loginfail=true;
//     }

//     )
//   }
//   registrationFormSubmit(registrationForm:any){
//      console.log(registrationForm);
//      const form= { emailid: registrationForm.value.emailid, name: registrationForm.value.name, password: registrationForm.value.password};
//     this._service.registerFormSubmitClient(form).subscribe(
//       (data)=> {
//         this.msgTrue = true;
//         console.log(data);
//       },
//       error=>{
//         console.log(error);
//         this.msgError=true;
//       }
//     )
//   }

// }
