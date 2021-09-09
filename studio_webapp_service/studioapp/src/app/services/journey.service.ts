import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Journey } from '../models/journey';

@Injectable({
  providedIn: 'root'
})




export class JourneyService {

  nodeAPI : String = "/journey";

  getAllJourneys(domainId : String,status : String){
    // return this.httpClient.get<Array<Journey>>("/api/v1/tree/journey");
      return this.httpClient.get<Array<any>>(this.nodeAPI+`/api/v1/tree/${domainId}/journey?status=${status}`);


    }


  postRelations(journey: Object): Observable<Object>
  {
    return this.httpClient.post(this.nodeAPI+"/api/v1/tree/nodes/relate", journey);

  }


  constructor(private httpClient: HttpClient) { }
}
