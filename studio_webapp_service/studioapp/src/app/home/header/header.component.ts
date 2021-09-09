import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private cookieValue_jwt: string;
  helper = new JwtHelperService();
  public userName: string;
  public userPicture: string;

  public showInitials = false;
  public initials: string;
  public circleColor: string = "#EB7181";
  // private colors = [
  //   '#EB7181',//RED
  //   '#468547',  //GREEN
  //   '#FFD558',//YELLOW
  //   '#3670B2'//BLUE
  // ];



  ngOnInit(): void {
    this.cookieValue_jwt = this.cookieService.get('JWT-TOKEN');
    console.log("cookie value is = ", this.cookieValue_jwt);
    this.getDecodedAndgetuserName();
    if (this.userPicture == undefined || this.userPicture == "" || this.userPicture == null) {
      this.showInitials = true;
      this.createInitials();

      //  const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
      //  this.circleColor = this.colors[randomIndex];
    } else {
      this.userPicture = this.userPicture;
    }

  }
  goToDomains() {
    return this.Router.navigateByUrl('/home/domains');
  }

  logoutUser(): void {
    this.cookieService.delete('JWT-TOKEN', "/", window.location.hostname)
    this.Router.navigateByUrl("/login")
  }
  goToProfile() {
    this.Router.navigateByUrl('/home/profile');
    console.log("routing done");

  }
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private cookieService: CookieService, private Router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.cookieValue_jwt = "";
    this.userName = "";
    this.userPicture = "";
  }
  getDecodedAndgetuserName() {
    const decodedToken = this.helper.decodeToken(this.cookieValue_jwt);
    this.userName = decodedToken.name;

    this.userPicture = decodedToken.pic;
    // console.log(this.userName);
    // console.log(this.userPicture);
    // if(decodedToken.pic == undefined || decodedToken.pic == "" || decodedToken.pic == null){
    //   this.userPicture="assets/user.svg";
    // }else{
    //  this.userPicture=decodedToken.pic;
    // }
  }

  private createInitials(): void {
    let initials = "";
    for (let i = 0; i <= this.userName.length; i++) {
      if (this.userName.charAt(i) === '') {
        continue;
      }
      //  this.userName.charAt(i).toUpperCase();
      initials = this.userName.charAt(i).toUpperCase();
      if (initials.length == 1) {
        break;
      }

    }
    this.initials = initials;
  }

}
