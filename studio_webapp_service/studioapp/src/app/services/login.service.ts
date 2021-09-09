import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  registerFormSubmitStudio(createBody:any){
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.http.post('/userservice/api/v1/studio/user/register',createBody, {headers: httpHeaders});

  }
  loginFormStudioSubmit(createdBody:any){
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.http.post('/userservice/api/v1/studio/user/login',createdBody,{headers: httpHeaders, responseType: "text"});
  }


}
