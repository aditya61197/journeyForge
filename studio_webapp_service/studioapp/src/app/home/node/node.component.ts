import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Node } from 'src/app/models/node';
import { NodeCategoryService } from 'src/app/services/node-category.service';
import { NodeDetailDialogComponent } from '../node-detail-dialog/node-detail-dialog.component';
import { UpdateNodeDialogComponent } from '../update-node-dialog/update-node-dialog.component';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  @Input() node : Node
  nodeCategoryName : String = "";

  constructor(public dialog: MatDialog, private nodeCategoryService : NodeCategoryService) {}

  ngOnInit(): void {
    this.nodeCategoryService.getNodeCategoriesWithDomainId(this.node['domainId']).subscribe(
      (nodeCategories) => {
        nodeCategories = nodeCategories.filter((category)=>{
          if(category.nodeCategoryId == this.node['nodeCategoryId'])
          {
            // console.log(category.nodeCategoryName);
            return true;
          }
          else
          {
            return false;

          }
        })
        this.nodeCategoryName = nodeCategories[0].nodeCategoryName;
      }
    )
  }
  openUpdateNodeDialog(node) : void
  {
  console.log(node);
    const dialogRef = this.dialog.open(UpdateNodeDialogComponent, {
     data:node,
      width: '40%',
      maxWidth: '100%',
      maxHeight: '80%',
    });
    dialogRef.afterClosed().subscribe(result => {

    });
      }

}
