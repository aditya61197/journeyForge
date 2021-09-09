import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { 

  }

  updateUser(user: any){
    return this.http.put<User>("/userservice/api/v1/users/"+user.user_id,user);
  }

  getUserData(userName:any):Observable<any>{
    //return this.httpClient.get<Array<Journey>>(this.nodeAPI + "/api/v1/tree/journey");
     return this.http.get<any>("/userservice/api/v1/userByEmailId/"+userName);

  
    }
}