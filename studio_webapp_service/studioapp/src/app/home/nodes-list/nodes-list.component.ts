import { Component, Input, OnInit, Inject } from '@angular/core';
import { NodeService } from 'src/app/services/node.service';
import { Node } from 'src/app/models/node';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateNodeDialogComponent } from '../create-node-dialog/create-node-dialog.component';
import { DomainService } from 'src/app/services/domain.service';

@Component({
  selector: 'app-nodes-list',
  templateUrl: './nodes-list.component.html',
  styleUrls: ['./nodes-list.component.css']
})
export class NodesListComponent implements OnInit {

  filterTerm : string = "";
  domainId ?: any;
  nodes ?: Array<Node> = [];
  totalNodesInDomain : number = 0;
  totalPages : any;
  limit : number = 10;

  constructor(public dialog: MatDialog, private nodeService: NodeService, private router : Router, private route: ActivatedRoute, private domainService : DomainService) { }

  ngOnInit(): void {


    this.route.paramMap.subscribe((params : ParamMap) => {
        this.domainId = params.get('domainId');

    this.domainService.domainIdBS.subscribe(
      (domainId) =>{
        this.domainId = domainId;
        // console.log(domainId)
      }
    )
        
    })

    // this.router.navigate(['/home/domains/' + this.domainId + '/nodes']);

    this.nodeService.getAllNodesWithDomainId(this.domainId).subscribe(
      (nodes)=>{
        this.totalNodesInDomain = nodes.length;
        this.totalPages = Math.floor(nodes.length);
        // console.log(nodes);
      },
      (err)=>{
        console.log(err);
      }
    )

    this.nodeService.getNodesWithDomainId(this.domainId, 0, this.limit).subscribe(
      (nodes)=>{
        this.nodes = nodes;
        // console.log(nodes);
      },
      (err)=>{
        console.log(err);
      }
    )
  
  }

  openPageNo(event)
  {
    this.nodeService.getNodesWithDomainId(this.domainId, event.pageIndex, this.limit).subscribe(
      (nodes)=>{
        this.nodes = nodes;
        // console.log(nodes);
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  openCreateNodeDialog() : void
  {
    const dialogRef = this.dialog.open(CreateNodeDialogComponent, {
      width: '40%',
      maxWidth: '40%',
      maxHeight: '80%'
    });

    dialogRef.afterClosed().subscribe(() => {
      
      // console.log('Create node dialog box was closed');

      this.nodeService.getNodesWithDomainId(this.domainId, 0, this.limit).subscribe(
        (nodes)=>{
          this.nodes = nodes;
          // console.log(nodes);
        },
        (err)=>{
          console.log(err);
        }
        )
      this.totalNodesInDomain = this.nodes.length;
      
    });
  }

  goToNodes() {
    this.router.navigate(['/home/domains', this.domainId, 'nodes']);
  }

  goToNodeCategories() {
    this.router.navigate(['/home/domains', this.domainId, 'nodecategories'])
  }

}
