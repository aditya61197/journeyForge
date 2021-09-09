import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Domain } from 'src/app/models/domain';
import { CategoriesBsService } from 'src/app/services/categories-bs.service';
import { DomainService } from 'src/app/services/domain.service';
import { NodeCategoryService } from 'src/app/services/node-category.service';
import { NodeService } from 'src/app/services/node.service';
import { LearningCategoryComponent } from '../learning-category/learning-category.component';

@Component({
  selector: 'app-create-node-dialog',
  templateUrl: './create-node-dialog.component.html',
  styleUrls: ['./create-node-dialog.component.css']
})
export class CreateNodeDialogComponent implements OnInit {

  private cookieValue_jwt : string;
  helper=new JwtHelperService();
  public userName: string;

  domains : any;
  nodeCategories : any;
  nodeCategoryName : String = '';
  conceptsList = [];
  coursesList = [];
  skillsRequested = [];
  requestedEducation = [];
  jobTitles = [];
  domainId : String;
  createNodeForm : any;

  constructor(public dialogRef: MatDialogRef<CreateNodeDialogComponent>, private httpClient : HttpClient, private cookieService : CookieService, private categoriesBsService : CategoriesBsService, private nodeService : NodeService, private domainService : DomainService, private nodeCategoryService : NodeCategoryService, private _snackBar: MatSnackBar) {

    this.cookieValue_jwt = this.cookieService.get('JWT-TOKEN');
    const decodedToken=this.helper.decodeToken(this.cookieValue_jwt);

    this.domainService.domainIdBS.subscribe(
      (domainId) => {
        this.domainId = domainId;
      }
    )

    // TODO: Uncomment for production
//     this.userName=decodedToken.name;

    this.createNodeForm = new FormGroup({
      nodeName : new FormControl(''),
      domainId : new FormControl(this.domainId),
      nodeCategoryId : new FormControl(''),
      properties : new FormGroup({}),
      createdBy : new FormControl('')
    });


   }

  ngOnInit(): void {


    this.domainService.getAllDomains().subscribe(
      (domains)=>{
        this.domains = domains;
      }
    )


    this.nodeCategoryService.getNodeCategoriesWithDomainId(this.domainId).subscribe(
      (nodeCategories) =>{
        this.nodeCategories = nodeCategories;
      }
    )


    this.categoriesBsService.conceptsListBS.subscribe(
      (conceptsList) => {
        this.conceptsList = conceptsList;
      }
    )

    this.categoriesBsService.skillsRequestedBS.subscribe(
      (skillsRequested) => {
        this.skillsRequested = skillsRequested;
      }
    )

    this.categoriesBsService.requestedEducationBS.subscribe(
      (requestedEducation) => {
        this.requestedEducation = requestedEducation;
      }
    )

    this.categoriesBsService.jobTitleListBS.subscribe(
      (jobTitles) => {
        this.jobTitles = jobTitles;
      }
    )

    this.categoriesBsService.coursesListBS.subscribe(
      (coursesList) => {
        this.coursesList = coursesList;
      }
    )



    // console.log(this.domainId);
    // console.log(this.domains);
    // console.log(this.nodeCategories);

  }

  passNodeCategoryName(nodeCategoryName)
  {
    this.nodeCategoryName = nodeCategoryName;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit(event)
  {
    event.stopPropagation();

    let categoryName = this.nodeCategoryName;

    if(categoryName.includes('Job')){

      this.createNodeForm.get('properties').get('skillsRequested').setValue(this.skillsRequested);

      this.createNodeForm.get('properties').get('requestedEducation').setValue(this.requestedEducation);
      this.createNodeForm.get('properties').get('commonJobTitles').setValue(this.jobTitles);

    }
    else if(categoryName.includes('Learning'))
    {
      this.createNodeForm.get('properties').get('concepts').setValue(this.conceptsList);
      this.createNodeForm.get('properties').get('courses').setValue(this.coursesList);
    }


    // console.log(this.createNodeForm.value)

    this.nodeService.createNode(this.createNodeForm.value).subscribe(
      (createdNode)=>{
        // console.log(createdNode);

        if(typeof createdNode == 'object')
        {
          this.openSnackBar('Node Created', 'Close');
        }
        this.createNodeForm.reset();
        this.categoriesBsService.conceptsListBS.next([]);
        this.categoriesBsService.jobTitleListBS.next([]);
        this.categoriesBsService.skillsRequestedBS.next([]);
        this.categoriesBsService.requestedEducationBS.next([]);
        this.categoriesBsService.coursesListBS.next([]);
        this.dialogRef.close();

      },
      (err)=>{
        this.openSnackBar('Unable to create Node', 'Close');
        console.log(err);
      }
    );

  }

}
