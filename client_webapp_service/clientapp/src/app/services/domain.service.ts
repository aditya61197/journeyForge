import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Domain } from '../../app/models/domain';
@Injectable({
  providedIn: 'root'
})
export class DomainService {
 domainsAPI :String = "/journey";
 // domainsAPI :String = "";
  domainIdBS = new BehaviorSubject("");

  constructor(private http: HttpClient) { }

  getAllDomains(): Observable<Array<Domain>>
  {
    return this.http.get<Array<Domain>>(this.domainsAPI + "/api/v1/client/domains");
  }
  getDomainByDomainId(domainId : String)
  { 
    return this.http.get<Domain>(this.domainsAPI + "/api/v1/domains/" + domainId)
  }


}
