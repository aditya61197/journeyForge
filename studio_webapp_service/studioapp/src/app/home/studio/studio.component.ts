import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JourneyService } from 'src/app/services/journey.service';
import { Journey } from 'src/app/models/journey';
import { NodeService } from 'src/app/services/node.service';
import { Node } from 'src/app/models/node';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DomainService } from 'src/app/services/domain.service';
import { FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { D3ForceDirectedLayout, DagreLayout, Layout } from '@swimlane/ngx-graph';


@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.css']
})
export class StudioComponent implements OnInit {


  linkListObject = this.objectCreation();
  domainId?: any;
  nodes?: Array<Node>;
  hierarchialGraph = { nodes: [], links: [] }
  update$: Subject<any> = new Subject();
  sourcenode?: any
  targetnode?: any
  link?: Object
  nodeList?: Array<any> = []
  linkList?: Array<any> = []
  sourcelink: any;
  targetlink: any;
  journeys: Array<Journey>;
  nodesArray: any[] = []
  linksArray: any[] = []
  countNodeArray = 0;
  countLinkArray = 0;
  selected: FormControl;
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();
  myControl = new FormControl();
  filteredOptions: Observable<Node[]>;
  fontColor = '#ffffff';
  nodeColor = '#AC4DB3';
  nodeColor2 = '#7CB34D';
  nodeCategoryId: String;
  Array: any[]=[];
  layouts:Layout


  

  constructor(private journeyService: JourneyService, private nodeService: NodeService, private route: ActivatedRoute, private domainService: DomainService, private snackBar: MatSnackBar) { }

  private _filter(name: string): Node[] {
    const filterValue = name.toLowerCase();
    return this.nodes.filter(option => option.nodeName.toLowerCase().includes(filterValue));
  }


  ngOnInit(): void {
    this.layouts=new DagreLayout()//passing dagre layout from parent component to journeygraph child component
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.domainId = params.get('domainId');

      this.domainService.domainIdBS.subscribe(
        (domainId) => {
          this.domainId = domainId;
        }
      )

    })


    this.sourcenode = {
      id: 0,
      label: '',
      data: {
        customColor: '',
        fontColor: '',
      }
    };
    this.targetnode = {
      id: 0,
      label: '',
      data: {
        customColor: '',
        fontColor: '',
      }
    };
    this.link = {
      source: '',
      target: '',
    };


    this.nodeService.getAllNodesWithDomainId(this.domainId).subscribe(
      (nodes) => {
        this.nodes = nodes;
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.nodes.slice())
          );
      },
      (err) => {
        ``
        console.log(err);
      }
    )


    this.journeyService.getAllJourneys(this.domainId, "active").subscribe(
      (journeys) => {
        this.journeys = journeys;
        this.traversearray();
        this.updateChart();
        this.centerGraph();
        this.fitGraph();
        console.log('getjourneys')
      },
      (err) => {
        console.log(err);
      }
    )

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

  createNodes(sampleData: any) {
    let node = {
      id: 0,
      label: '',
      data: {
        customColor: '',
        fontColor: this.fontColor,
      },
      dimen:{
        width:0,
        height:0
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
          width:110,
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
        width:110,
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
    //console.log(this.hierarchialGraph.nodes)


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
      let concat = linkage.source.concat('/').concat(linkage.target);


      if (this.linksArray.includes(concat))
        return;
      this.linksArray[this.countLinkArray++] = concat;
      this.hierarchialGraph.links.push(linkage);
      this.createLinks(sampleData)
    })
  }
  updateChart() {
    this.update$.next(true);
  }

  // getRandomColor = (participant, s, l) => {
  //   var hash = 0;
  //   for (var i = 0; i < participant.length; i++) {
  //     hash = participant.charCodeAt(i) + ((hash << 5) - hash);
  //   }

  //   var h = hash % 360;
  //   return "hsl(" + h + ", " + s + "%, " + l + "%)";
  // };


  pushToSource(node: Node) {
  

    if(this.nodeCategoryId!=node.nodeCategoryId && this.nodeCategoryId!=undefined )
    {
      this.sourcenode = {
        id: node.nodeId,
        label: node.nodeName,
        data: {
          customColor: this.nodeColor,
          fontColor: this.fontColor,
        },
        dimen:{
          width:110,
          height:48
        },
        posi:{
          center:"middle"
        }
      };
    }
    else
  {
    this.nodeCategoryId=node.nodeCategoryId 
    this.sourcenode = {
      id: node.nodeId,
      label: node.nodeName,
      data: {
        customColor: this.nodeColor2,
        fontColor: this.fontColor,
      },
      dimen:{
        width:110,
        height:48
      },
      posi:{
        center:"middle"
      }
    };
  }


    this.sourcelink = node.nodeId;
    if (this.nodeList.includes(this.sourcenode.id) == false && this.nodesArray.includes(this.sourcenode.id) == false) {
      this.nodeList.push(this.sourcenode.id);
      this.hierarchialGraph.nodes.push(this.sourcenode);
      console.log(this.sourcenode)
      console.log(this.hierarchialGraph.nodes)
      this.updateChart();
      this.centerGraph();
      this.fitGraph();
    }

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.nodes.slice())
      );



  }

  pushToTarget(node: Node) {
    if(this.nodeCategoryId!=node.nodeCategoryId && this.nodeCategoryId!=undefined )
    {
      this.targetnode = {
        id: node.nodeId,
        label: node.nodeName,
        data: {
          customColor: this.nodeColor,
          fontColor: this.fontColor,
        },
        dimen:{
          width:110,
          height:48,
        },
        posi:{
          center:"middle"
        }
      };
    }
    else
  {
    this.nodeCategoryId=node.nodeCategoryId 
    this.targetnode = {
      id: node.nodeId,
      label: node.nodeName,
      data: {
        customColor: this.nodeColor2,
        fontColor: this.fontColor,
      },
      dimen:{
        width:110,
        height:48
      },
      posi:{
        center:"middle"
      }
    };
  }

    this.targetlink = node.nodeId;
    if (this.nodeList.includes(this.targetnode.id) == false && this.nodesArray.includes(this.targetnode.id) == false && this.sourcenode != this.targetnode) {

      this.nodeList.push(this.targetnode.id);
      this.hierarchialGraph.nodes.push(this.targetnode);
      this.updateChart();
      this.centerGraph();
      this.fitGraph();
    }

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.nodes.slice())
      );


  }

  pushToLinks() {
    this.link = {
      source: this.sourcelink,
      target: this.targetlink,
    };

    if (this.sourcelink == undefined && this.targetlink == undefined) {
      this.snackBar.open('Please enter source and target node', 'Close', {
        duration: 3000
      });
      this.myControl = new FormControl('', [
        Validators.required,
        Validators.pattern(''),
      ]);
      return;
    }


    if (this.sourcelink == this.targetlink) {

      this.snackBar.open('Node cannot be linked to itself', 'Close', {
        duration: 3000
      });
      this.myControl = new FormControl('', [
        Validators.required,
        Validators.pattern(''),
      ]);
      return;
    }


    if (this.linkList.includes(this.sourcelink.concat('/').concat(this.targetlink)) == false && this.linksArray.includes(this.sourcelink.concat('/').concat(this.targetlink)) == false) {
      this.linkList.push(this.sourcelink.concat('/').concat(this.targetlink));
      this.hierarchialGraph.links.push(this.link);
      this.updateChart();
      this.centerGraph();
      this.fitGraph();
      this.synclinks(this.sourcelink, this.targetlink, this.linkListObject)
    }

    else if (this.sourcenode != '' && this.targetnode != '') {
      this.snackBar.open('These nodes have already been linked', 'Close', {
        duration: 3000
      });
    }
    // else {
    //   this.snackBar.open('Please enter source and target node', 'Close', {
    //     duration: 3000
    //   });
    // }


    this.myControl = new FormControl('', [
      Validators.required,
      Validators.pattern(''),
    ]);

    console.log("check dimension",this.hierarchialGraph)

    

  }
  reset()
  {
    this.journeyService.getAllJourneys(this.domainId, "active").subscribe(
      (journeys) => {
        this.journeys = journeys;
        this.traversearray();
        this.updateChart();
        this.centerGraph();
        this.fitGraph();
        console.log('getjourneys')
      },
      (err) => {
        console.log(err);
      }
    )
    if (this.sourcenode.id == 0 && this.targetnode.id == 0) {
      this.snackBar.open('No values entered', 'Close', {
        duration: 3000
      });
      return
    }
    this.hierarchialGraph.nodes.map(data => {
      console.log(data.id)
      if(this.nodesArray.includes(data.id)==false)
      {
        let index = this.hierarchialGraph.nodes.indexOf(data)
        this.hierarchialGraph.nodes.splice(index)
        index = this.nodeList.indexOf(data.id);
        this.nodeList.splice(index)
        this.updateChart();
      }
    })

    this.hierarchialGraph.links.map(data => {
      if(this.linksArray.includes(data.source.concat("/").concat(data.target)) == false)
      {
        let index = this.hierarchialGraph.links.indexOf(data)
        this.hierarchialGraph.links.splice(index)
        index = this.linkList.indexOf(data.source.concat("/").concat(data.target));
        this.linkList.splice(index)
        this.updateChart();
      }
    })

  
  }

  saveGraph() {

    this.journeyService.postRelations(this.linkListObject).subscribe(
      (relations) => {
        console.log('working')
      }
    )
    console.log("showUpdatedLinkListObject", this.linkListObject)


  }

  setNodeValues(object: any) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (object.nodeId == this.nodes[i].nodeId) {
        object.nodeName = this.nodes[i].nodeName;
        object.domainId = this.nodes[i].domainId;
        object.nodeCategoryId = this.nodes[i].nodeCategoryId;
        object.status = "active";
      }

      if (object['journey'] == null)
        return;
      object.journey.map(Data => {
        this.setNodeValues(Data);
      })

    }



  }
  objectCreation() {
    return {
      nodeId: '',
      nodeName: '',
      domainId: '',
      nodeCategoryId: '',
      status: 'pending',
      journey: []
    }
  }

  synclinks(source: any, target: any, linkListObject: { nodeId: string, nodeName: string, journey: any[] }) {
    if (linkListObject['nodeId'] == '') {
      linkListObject.nodeId = source
      this.setNodeValues(linkListObject);
    }
    if (linkListObject['nodeId'] == source) {
      let tempObj = this.objectCreation();
      tempObj.nodeId = target;
      linkListObject['journey'].push(tempObj)
      this.setNodeValues(linkListObject);
      return;
    }
    else {
      if (linkListObject['journey'].length == 0) {
        let rootObj = this.objectCreation();
        rootObj.nodeId = source;
        rootObj.journey.push(this.linkListObject)  //when we want to add a node as root element
        this.linkListObject = rootObj;
        this.setNodeValues(this.linkListObject);
        return;
      }
      for (let obj of linkListObject.journey) { //to iterate through journeys of nodes recursively
        this.synclinks(source, target, obj)
      }

    }

  }

}

