import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NodeCategoryService } from 'src/app/services/node-category.service';


@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.css']
})
export class NodeDetailsComponent implements OnInit {

  nodeCategoryName : String = "";
  show:boolean;
  constructor(public dialogRef: MatDialogRef<NodeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public node: Node, private nodeCategoryService : NodeCategoryService) { }

  ngOnInit(): void {
    console.log(this.node)
      this.nodeCategoryService.getNodeCategoriesWithDomainId(this.node['domainId']).subscribe(
        (nodeCategories) => {
          nodeCategories=nodeCategories.filter((category)=>{
            if(category.nodeCategoryId == this.node['nodeCategoryId'])
            {
              return true;
            }
            return false;
          })
          this.nodeCategoryName = nodeCategories[0].nodeCategoryName;
         // console.log(this.nodeCategoryName);
        }
      )
        
      
  }

}
