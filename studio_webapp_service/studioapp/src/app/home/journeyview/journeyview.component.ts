import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { D3ForceDirectedLayout, DagreLayout, Layout } from '@swimlane/ngx-graph';
import { Subject } from 'rxjs';
import { Journey } from 'src/app/models/journey';
import { DomainService } from 'src/app/services/domain.service';
import { JourneyService } from 'src/app/services/journey.service';
import { NodeService } from 'src/app/services/node.service';

@Component({
  selector: 'app-journeyview',
  templateUrl: './journeyview.component.html',
  styleUrls: ['./journeyview.component.css']
})
export class JourneyviewComponent implements OnInit {
  hierarchialGraph = { nodes: [], links: [] }
  nodesArray: any[] = []
  linksArray: any[] = []
  countNodeArray = 0;
  countLinkArray = 0;
  journeys: Array<Journey>;
  update$: Subject<any> = new Subject();
  domainId?: any;
  nodes?: any;
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();
  fontColor='#ffffff'
  nodeColor = '#AC4DB3';
  nodeColor2 = '#7CB34D';
  nodeCategoryId: any;
  layouts:Layout

  constructor( private route: ActivatedRoute, private domainService: DomainService, private nodeService: NodeService,private journeyService: JourneyService) { }


  public ngOnInit(): void {
    this.layouts=new DagreLayout()//passing dagre layout from parent component to journeygraph child component
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.domainId = params.get('domainId');

      this.domainService.domainIdBS.subscribe(
        (domainId) => {
          this.domainId = domainId;
        }
      )

    })

    this.nodeService.getAllNodesWithDomainId(this.domainId).subscribe(
      (nodes) => {
        this.nodes = nodes;
      },
      (err) => {
        console.log(err);
      }
    )



    this.journeyService.getAllJourneys(this.domainId,"active").subscribe(
      (journeys) => {
        this.journeys = journeys;
        this.traversearray();
        this.updateChart();
        this.centerGraph();
        this.fitGraph();
        console.log(journeys);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  updateChart() {
    this.update$.next(true);
  }
  fitGraph() {
    this.zoomToFit$.next(true)
}
  centerGraph() {
    this.center$.next(true)
}
  traversearray() {

    for (let i = 0; i < this.journeys.length; i++) {
      this.createNodes(this.journeys[i]);
      this.createLinks(this.journeys[i]);
    }
  }

  // getRandomColor = (participant, s, l) => {
  //   var hash = 0;
  //   for (var i = 0; i < participant.length; i++) {
  //     hash = participant.charCodeAt(i) + ((hash << 5) - hash);
  //   }

  //   var h = hash % 360;
  //   return "hsl(" + h + ", " + s + "%, " + l + "%)";
  // };

  createNodes(sampleData: any) {
    let node = {
      id: 0,
      label: '',
      data:{
        customColor:'',
        fontColor:this.fontColor
      },
      dimen:{
        width:140,
        height:48
      },
      posi:{
        center:"middle"
      }
    };

    if(this.nodeCategoryId!=sampleData.nodeCategoryId && this.nodeCategoryId!=undefined )
    {
      node = {
        id: sampleData.nodeId,
        label: sampleData.nodeName,
        data: {
          customColor: this.nodeColor,
          fontColor: this.fontColor,
        },
        dimen:{
          width:140,
          height:48
        },
        posi:{
          center:"middle"
        }
      };
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
      },
      dimen:{
        width:140,
        height:48
      },
      posi:{
        center:"middle"
      }
    };
  }
    // node.id = sampleData.nodeId; 
    // node.label = sampleData.nodeName;


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
          
      
      
    
