import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
nodeAPI :String = "/journey";
//nodeAPI :String = "";
  constructor(private httpClient: HttpClient) { }

  

  getNodesWithDomainId(domainId : String)
  {
    return this.httpClient.get<Array<Node>>(this.nodeAPI + "/api/v1/nodes?domainid="+domainId);

   
  }
  getNodeWithNodeId(nodeId:String)
  {
    return this.httpClient.get<Node>(this.nodeAPI + "/api/v1/nodes/"+nodeId);
  }

  createNode(node : Node)
  {
    return this.httpClient.post<Node>(this.nodeAPI + '/api/v1/nodes', node, {
      headers : {
        'Content-Type' : 'application/json'
      }
    })
  }
}
