import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { NodeCategoryService } from 'src/app/services/node-category.service';
import { NodeCategory } from 'src/app/models/node-category';


@Component({
  selector: 'app-node-detail-dialog',
  templateUrl: './node-detail-dialog.component.html',
  styleUrls: ['./node-detail-dialog.component.css']
})
export class NodeDetailDialogComponent implements OnInit {

  nodeCategoryName : String = "";


  constructor(public dialogRef: MatDialogRef<NodeDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public node: Node, private nodeCategoryService : NodeCategoryService) { }

  ngOnInit(): void {
    // console.log(this.node)
    this.nodeCategoryService.getNodeCategoriesWithDomainId(this.node['domainId']).subscribe(
      (nodeCategories) => {
        nodeCategories = nodeCategories.filter((category)=>{
          if(category.nodeCategoryId == this.node['nodeCategoryId'])
          {
            // console.log(category.nodeCategoryName)
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
  
}
