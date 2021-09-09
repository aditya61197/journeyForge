import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // private cookieValue_jwt : string;
  // helper=new JwtHelperService();
  // public userName: string;
  // public userPicture: string;


  constructor(private router : Router) {


   }

  ngOnInit(): void {
    // this.cookieValue_jwt = this.cookieService.get('JWT-TOKEN');
    // console.log("cookie value is = ",this.cookieValue_jwt);
    // this.getDecodedAndgetuserName();

  }

  goToDomains()
  {
    return this.router.navigate(['/home/domains']);
  }

  // getDecodedAndgetuserName(){
  //   const decodedToken=this.helper.decodeToken(this.cookieValue_jwt);
  //    this.userName=decodedToken.name;
  //    let intials = "";
  //     if(decodedToken.pic == undefined || decodedToken.pic == "" || decodedToken.pic == null){
  //      this.userPicture="assets/user.svg";
  //      for(let i=0;i<this.userName.length;i++){
  //        if(this.userName.charAt(i)==''){
  //          continue;
  //        }
  //        if(this.userName.charAt(i)===this.userName.charAt(i).toUpperCase()){
  //          intials+=this.userName.charAt(i);
  //          if(intials.length == 2){
  //            break;
  //          }
  //        }
  //      }
  //      this.userPicture=intials;
  //    }else{
  //     this.userPicture=decodedToken.pic;
  //    }

  //  }



}
