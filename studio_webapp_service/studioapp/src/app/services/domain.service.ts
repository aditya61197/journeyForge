import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Domain } from '../models/domain';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  domainIdBS = new BehaviorSubject("");
  domainsAPI :String = "/journey";

  constructor(private httpClient: HttpClient) { }

  getAllDomains(): Observable<Array<Domain>>
  {
    let  url ="/api/v1/domains";

    // // FOR PRODUCTION
    return this.httpClient.get<Array<Domain>>(this.domainsAPI + url);

    // FOR DEVELOPMENT
    // return this.httpClient.get<Array<Domain>>(url);
  }

  CreateDomain(domain:Domain)
  {
    let url = "/api/v1/domains";

    return this.httpClient.post<Domain>(this.domainsAPI + url,domain, {
      headers : {
        'Content-Type' : 'application/json'
      }
    })
  }
 
}

