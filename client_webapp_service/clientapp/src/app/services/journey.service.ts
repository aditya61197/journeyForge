import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JourneyComponent } from '../home/journey/journey.component';
import { JourneymgmtComponent } from '../home/journeymgmt/journeymgmt.component';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {
 baseAPI="/journey";
 //baseAPI = "";
  domainIdBS=new BehaviorSubject("")
  constructor(private httpClient: HttpClient) { }

  getAllJourneys(domainId:String, status:String){
    return this.httpClient.get<Array<any>>(this.baseAPI + `/api/v1/tree/${domainId}/journey?status=${status}`);
  }
 
}
