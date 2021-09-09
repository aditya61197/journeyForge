import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NodeCategory } from 'src/app/models/node-category';
import { NodeCategoryService } from 'src/app/services/node-category.service';

@Component({
  selector: 'app-node-category',
  templateUrl: './node-category.component.html',
  styleUrls: ['./node-category.component.css']
})
export class NodeCategoryComponent implements OnInit {

  @Input() nodeCategory : NodeCategory;

  constructor(private nodeCategoryService : NodeCategoryService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  activateCategory(nodeCategory)
  {
    this.nodeCategoryService.createNodeCategory(nodeCategory).subscribe(
      (createdNodeCategory)=>{
        // console.log(createdNodeCategory)
        nodeCategory['status'] = 'active';
        if(typeof nodeCategory == 'object')
        {
          this.openSnackBar('Node Category Created', 'Close');
        }
      },
      (err)=>{
        this.openSnackBar('Unable to create Node Category', 'Close');
        console.log(err);
      }
    );
    
  }
}
