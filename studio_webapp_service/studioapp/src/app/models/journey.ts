export class Journey {
  nodeId ?: string;
  nodeName ?: string;
  domainId ?: string;
  nodeCategoryId ?: string;
  status ?: string;
  journey ?: any[];

  constructor(nodeId:string,nodeName:string,domainId:string,nodeCategoryId:string,
    status:string,journey:any[])
  {
    this.nodeId=nodeId;
    this.nodeName=nodeName;
    this.domainId=domainId;
    this.nodeCategoryId=nodeCategoryId;
    this.status=status;
    this.journey=journey;
  }
}
