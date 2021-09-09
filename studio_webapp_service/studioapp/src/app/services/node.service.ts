import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Node } from 'src/app/models/node';
import { DomainService } from './domain.service';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
 

  nodeAPI :String = "/journey";

  constructor(private httpClient: HttpClient) { }

  


  // FOR PRODUCTION
  getAllNodesWithDomainId(domainId : String)
  {
    return this.httpClient.get<Array<Node>>(this.nodeAPI + "/api/v1/nodes?domainid="+domainId);
  }

  getNodesWithDomainId(domainId : String, page : number, limit : number)
  {

    return this.httpClient.get<Array<Node>>(this.nodeAPI + "/api/v1/nodes?domainid="+domainId + "&page=" + page + "&limit=" + limit);
  }

  getNodeWithNodeId(nodeId: String) {
    return this.httpClient.get<Node>(this.nodeAPI + "/api/v1/nodes/" + nodeId);
  }


  createNode(node : Node)
  {
    return this.httpClient.post<Node>(this.nodeAPI+'/api/v1/nodes', node, {
      headers : {
        'Content-Type' : 'application/json'
      }
    })
  }

  updateNode(node:Node)
  {
    console.log(node);
   return this.httpClient.put<Node>(this.nodeAPI+'/api/v1/nodes',node, {
     headers : {
       'Content-Type' : 'application/json'
     }
   })
  }

  // updateEmployee(id: number, value: any): Observable<Object> {
  //   return this.http.put(`${this.baseUrl}/${id}`, value);
  // }



  // FOR DEVELOPMENT
  // getAllNodesWithDomainId(domainId : String)
  // {
  //   return this.httpClient.get<Array<Node>>("/api/v1/nodes?domainid="+domainId);
  // }

  // getNodesWithDomainId(domainId : String, page : number, limit : number)
  // {

  //   return this.httpClient.get<Array<Node>>("/api/v1/nodes?domainid="+domainId + "&page=" + page + "&limit=" + limit);
  // }

  // getNodeWithNodeId(nodeId: String) {
  //   return this.httpClient.get<Node>("/api/v1/nodes/" + nodeId);
  // }

  // createNode(node : Node)
  // {
  //   return this.httpClient.post<Node>('/api/v1/nodes', node, {
  //     headers : {
  //       'Content-Type' : 'application/json'
  //     }
  //   })
  // }


}
