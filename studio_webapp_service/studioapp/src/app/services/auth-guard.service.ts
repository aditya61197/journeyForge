import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  helper=new JwtHelperService();
  userName: string;
  cookieValue_jwt: string;
  constructor(public router: Router, private cookieService: CookieService) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const check: Boolean = false;
    this.cookieValue_jwt = this.cookieService.get('JWT-TOKEN');
    if (this.cookieValue_jwt) {
      return true;
    } else {
      this.router.navigateByUrl("/login")
      return false;
    }
  }


  getDecodedAndgetuserName(){
    const decodedToken=this.helper.decodeToken(this.cookieValue_jwt);
      this.userName=decodedToken.name;    
   }
}
