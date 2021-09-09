import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user';
import { FormService } from 'src/app/services/form.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user-profile-display',
  templateUrl: './user-profile-display.component.html',
  styleUrls: ['./user-profile-display.component.css']
})
export class UserProfileDisplayComponent implements OnInit {

  private cookieValue_jwt : string;
  helper=new JwtHelperService();
  user_id="";
  user: any=new User();
  interests: String[] = [
    
  ];

  qualifications: String[] = [

  ];
  userName: any;
  picture: any;


  constructor(private service:FormService, private router: Router, private loginService:FormService, private cookieService: CookieService, public dialog: MatDialog) { 
    this.cookieValue_jwt="";
  }

  openDialog(){
    this.dialog.open(UserProfileComponent, {height:"930px", width:"600px"});
  }


  ngOnInit(): void {
    this.cookieValue_jwt = this.cookieService.get('JWT-TOKEN');
    console.log("cookie value is = ",this.cookieValue_jwt);
    this.getDecodedAndgetuserName();
    console.log(this.userName);

    this.getUserData();
  }

  getDecodedAndgetuserName(){
    const decodedToken=this.helper.decodeToken(this.cookieValue_jwt);
      this.userName=decodedToken.username;
  }


  getUserData(){
    this.service.getUserData(this.userName).subscribe(
      (data)=>{console.log(data);
       this.user_id=data.user_id;
        this.user.emailid=data.emailid;
        this.user.name=data.name;
        if(data.phoneNo!=null){
          this.user.phoneNo=data.phoneNo;
        }                 
        if(data.address!=null){
         this.user.address=data.address;
       }  
       if(data.dob!=null){
         this.user.dob=data.dob;
       }  
       if(data.gender!=null){
         this.user.gender=data.gender;
       }  
       if(data.interests!=null){
         this.user.interests=data.interests;
       }
       if(data.qualifications!=null){
         this.user.qualifications=data.qualifications;
       }
       if(data.picture!=null){
        this.user.picture=data.picture;
      }
      },
      (error)=>{console.log(error)}
    )

  }
}
