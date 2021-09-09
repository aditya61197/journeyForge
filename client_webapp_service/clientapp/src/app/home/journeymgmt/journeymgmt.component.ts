import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DomainService } from 'src/app/services/domain.service';
import { JourneyService } from 'src/app/services/journey.service';
import { NodeService } from 'src/app/services/node.service';
import { JourneyComponent } from '../journey/journey.component';


@Component({
  selector: 'app-journeymgmt',
  templateUrl: './journeymgmt.component.html',
  styleUrls: ['./journeymgmt.component.css']
})
export class JourneymgmtComponent implements OnInit {
  domainId?: any;
  domain : any;
  @ViewChild(JourneyComponent) journeyCmp: JourneyComponent;
  hierarchialGraph = { nodes: [], links: [] }
  graphdata;
  nodesArray: any[] = []
  linksArray: any[] = []
  countNodeArray = 0;
  countLinkArray = 0;
  journeys: Array<any>;
  
  fontColor='#ffffff';
  nodeColor = '#AC4DB3';
  nodeColor2 = '#7CB34D';
  nodeCategoryId: any;

  
  constructor(private router: Router, private route: ActivatedRoute, private journeyService: JourneyService, private nodeService: NodeService, private domainService : DomainService) {}
  
  
  ngOnInit(): void {
   
  
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.domainId = params.get('domainId');
      console.log(this.domainId);
    });

    this.domainService.getDomainByDomainId(this.domainId).subscribe(
      (domain)=>{
        this.domain = domain; 
        // this.domainName = this.domain['domainName'];
        console.log(this.domain)
      },
      (err)=>{
        console.log(err);
      }
    )

    this.journeyService.getAllJourneys(this.domainId,"active").subscribe(
      (journeys) => {
        this.journeys = journeys;
        this.traversearray();
        this.journeyCmp.updateChart();
        console.log(journeys);
      },
      (err) => {
        console.log(err);
      }
    )

  }


  traversearray() {

    for (let i = 0; i < this.journeys.length; i++) {
      this.createNodes(this.journeys[i]);
      this.createLinks(this.journeys[i]);
    }
  }

  createNodes(sampleData: any) {
    let node = {
      id: 0,
      label: '',
      //status:"",
      data:{
        customColor:'',
        fontColor:this.fontColor
      }
    };
    if(this.nodeCategoryId!=sampleData.nodeCategoryId && this.nodeCategoryId!=undefined )
    {
      node=
      {
        id : sampleData.nodeId,
        label : sampleData.nodeName,
        //status:"active",
        data: {
          customColor: this.nodeColor,
          fontColor: this.fontColor,
              }
      }
    }
    else
    {
      this.nodeCategoryId=sampleData.nodeCategoryId 
      node = {
        id: sampleData.nodeId,
        label: sampleData.nodeName,
        data: {
          customColor: this.nodeColor2,
          fontColor: this.fontColor,
        }
      };
    } 

    if (this.nodesArray.includes(node.id))
    return;

this.nodesArray[this.countNodeArray++] = node.id
this.hierarchialGraph.nodes.push(node);
if (sampleData['journey'] == null)
  return;
sampleData.journey.map(sampleData => {
  this.createNodes(sampleData);
})
}

  createLinks(sampleDataParent: any) {
    if (sampleDataParent['journey'] == null)
      return;

    sampleDataParent['journey'].map(sampleData => {
      let linkage = {
        source: '',
        target: '',
      };  
      linkage.source = sampleDataParent.nodeId;
      linkage.target = sampleData.nodeId;
      let concat=linkage.source.concat('-').concat(linkage.target);
      console.log("concat:",concat);
      
        if (this.linksArray.includes(concat))
          return;
          this.linksArray[this.countLinkArray++] = concat;
          console.log("linksArray : ",this.linksArray)
          this.hierarchialGraph.links.push(linkage);
          this.createLinks(sampleData)
    })
  }

}
