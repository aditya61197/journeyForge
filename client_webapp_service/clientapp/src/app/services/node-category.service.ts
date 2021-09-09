import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeCategory } from '../models/node-category';


@Injectable({
  providedIn: 'root'
})
export class NodeCategoryService {
  //NodeCategory:any;
  nodeCategoryAPI: String = "/journey";
  constructor(private httpClient: HttpClient) { }

  // FOR PRODUCTION
 
 getNodeCategoriesWithDomainId(domainId : String)
  {
   return this.httpClient.get<Array<NodeCategory>>(this.nodeCategoryAPI + "/api/v1/nodecategories?domainid="+domainId);
  }

  // FOR DEVELOPMENT
  // getNodeCategoriesWithDomainId(domainId: String) {
  //   return this.httpClient.get<Array<NodeCategory>>("/api/v1/nodecategories?domainid=" + domainId);

  // }

}
