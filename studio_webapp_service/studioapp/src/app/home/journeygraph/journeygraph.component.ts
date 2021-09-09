import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NodeDetailDialogComponent } from '../node-detail-dialog/node-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Node } from 'src/app/models/node';
import { NodeService } from 'src/app/services/node.service';
import { Layout } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-journeygraph',
  templateUrl: './journeygraph.component.html',
  styleUrls: ['./journeygraph.component.css'],
})
export class JourneygraphComponent implements OnInit {

  @Input()
  hierarchialGraph = { nodes: [], links: [] };

  @Input()
  update$: Subject<any> = new Subject();
  @Input()
  center$: Subject<boolean> = new Subject();
  @Input()
  zoomToFit$: Subject<boolean> = new Subject();
  @Input()
  layout: Layout;





  constructor(public dialog: MatDialog, private nodeService: NodeService) {}

  ngOnInit(): void {
    console.log(this.layout)
    console.log(this.hierarchialGraph)
  }

  seeDetails(node: Node): void {

    // console.log(node);
    var realNode1;
    this.nodeService.getNodeWithNodeId(node.id).subscribe(
      (originalNode) => {
              console.log(originalNode);

              const dialogRef = this.dialog.open(NodeDetailDialogComponent, {
                data: originalNode,
                minHeight: 'fit-content',
                height: 'fit-content',
                maxWidth:'55%'
              });

              dialogRef.afterClosed().subscribe((result) => {
                // console.log('The dialog was closed');
              });
            },
      (err) => {
        console.log(err);
      }
    );
  }
}
