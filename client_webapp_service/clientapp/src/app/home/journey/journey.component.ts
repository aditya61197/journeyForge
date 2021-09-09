import {Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import * as shape from 'd3-shape';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { JourneyService } from 'src/app/services/journey.service';
import {MatDialog} from '@angular/material/dialog';
import { NodeDetailsComponent } from '../node-details/node-details.component';
import { Subject } from 'rxjs';
import { NodeService } from 'src/app/services/node.service';
import { Domain } from 'src/app/models/domain';
import { DomainService } from 'src/app/services/domain.service';
import { SvgSaver } from 'svgsaver/src/svgsaver.js'
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';




@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {
  domains ?: Array<Domain>;
 
  @Input() domain: any;
 
  domainId: any;
  enlarged : boolean = false;
  downloader = new SvgSaver(); 

  @Input()
 // node:Node;
  hierarchialGraph = {nodes: [], links: []}
  curve = shape.curveBundle.beta(1);
  update$: Subject<any> = new Subject();
 
 
  // curve = shape.curveLinear;
  updateChart() {
    this.update$.next(true);
  }
 
  constructor(public dialog:MatDialog, private journeyService: JourneyService, private domainService:DomainService, private nodeService: NodeService)
  {

  }

  
  enlargeIt()
  {
    document.getElementById("box").style.height="120vh";
    this.enlarged = true;
  }
  exitLarge()
  {
    document.getElementById("box").style.height="60vh";
    this.enlarged = false;

  }

  
  downloadGraph()
  {
    let graph = document.querySelector('#box');
    this.downloader.asPng(graph, this.domain.domainName); 

  }
  /*arrowBlink(node)
  {
    document.getElementById("lines").style.strokeWidth="2";
   // console.log( document.getElementById("lines"));
  }
  arrowDown(node)
  {
    document.getElementById("lines").style.strokeWidth="1.5";
  }*/
  
  /*openDialog(node): void 
  {
   console.log(node);
   var realNode1;
   this.nodeService.getNodeWithNodeId(node.id).subscribe(
     (err)=>{
       console.log(err)
     },
     (originalNode)=>{
        realNode1 = originalNode.error;
        console.log(originalNode)

        const dialogRef = this.dialog.open(NodeDetailsComponent, {
      
          data: realNode1,
          minHeight: 'fit-content',
          height: 'fit-content'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          // console.log('The dialog was closed');
        });

     }
   );
    
  }*/
  openDialog(node): void 
  {
   this.nodeService.getNodeWithNodeId(node.id).subscribe(
     (originalNode)=>{
       // console.log(originalNode)

        const dialogRef = this.dialog.open(NodeDetailsComponent, {
      
          data: originalNode,
          minHeight: 'fit-content',
          height: 'fit-content'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          // console.log('The dialog was closed');
        });

     },
 (err)=>{
       console.log(err)
     }
   );
    
  }
 
  public ngOnInit():void {

   /* this.domainService.getAllDomains().subscribe(
      (domains)=>{
        
        this.domains = domains;
        console.log(domains);
      },
      (err)=>{
        console.log(err);
      }
      )*/
  }


}

