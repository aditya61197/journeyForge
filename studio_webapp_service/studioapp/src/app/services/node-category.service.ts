import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeCategory } from '../models/node-category';

@Injectable({
  providedIn: 'root'
})
export class NodeCategoryService {

  nodeCategoryAPI :String = "/journey";

  constructor(private httpClient: HttpClient) { }

  // getAllNodeCategories() : Observable<Array<NodeCategory>>
  // {
  //   return this.httpClient.get<Array<NodeCategory>>(this.NodeCategoriesAPI + "/api/v1/nodecategories");
  // }


  // FOR PRODUCTION
  getNodeCategoriesWithDomainId(domainId : String)
  {
    return this.httpClient.get<Array<NodeCategory>>(this.nodeCategoryAPI + "/api/v1/nodecategories?domainid="+domainId);
  }

  createNodeCategory(nodeCategory)
  {
    return this.httpClient.post(this.nodeCategoryAPI + '/api/v1/nodecategories', nodeCategory);
  }

  getNodeCategoriesWithNodeCategoryId(nodeCategoryId : String)
  {
    return this.httpClient.get<NodeCategory>(this.nodeCategoryAPI +`/api/v1/nodecategories/${nodeCategoryId}`);
  }


  // FOR DEVELOPMENT
  // getNodeCategoriesWithDomainId(domainId : String)
  // {
  //   return this.httpClient.get<Array<NodeCategory>>("/api/v1/nodecategories?domainid="+domainId);
  // }

  // createNodeCategory(nodeCategory)
  // {
  //   return this.httpClient.post('/api/v1/nodecategories', nodeCategory);
  // }

}
