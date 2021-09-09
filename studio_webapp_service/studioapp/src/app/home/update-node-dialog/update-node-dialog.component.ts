import { Component, OnInit,Input,Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NodeService } from 'src/app/services/node.service';
import { ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { NodeCategoryService } from 'src/app/services/node-category.service';
import { Node} from 'src/app/models/node'
export interface RequestedEducation {
  name: String;
  percentage : String;
}
export interface Course {
  name: String;
  link: String;
  duration : String;
}

@Component({
  selector: 'app-update-node-dialog',
  templateUrl: './update-node-dialog.component.html',
  styleUrls: ['./update-node-dialog.component.css']
})

export class UpdateNodeDialogComponent implements OnInit {
 
  nodeToUpdate:any;
  updateNodeForm:any;
  nodeCategoryData:any;
  nodeCategoryId:string;
  nodeCategoryName: String='';
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skillsRequested : String[] = [];
  jobTitles : String[] = [];
  concepts : String[] = [];
  level:String= '';
  updateNodeData:any;
  requestedEducation : RequestedEducation[] = [];
  formController : any;
  formControllerLearning:any;
  properties :FormGroup;
  courses : Course[] = [];
 
 constructor(public dialogRef: MatDialogRef<UpdateNodeDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public node: Node,private nodeCategoryService:NodeCategoryService,private nodeService:NodeService){ 
      this.nodeToUpdate=this.node;   
      this.updateNodeForm = new FormGroup({
      nodeId:new FormControl(this.nodeToUpdate.nodeId),
      nodeName : new FormControl(this.nodeToUpdate.nodeName,Validators.required),
      domainId : new FormControl(),
      nodeCategoryId : new FormControl(this.nodeToUpdate.nodeCategoryId),
      createdBy : new FormControl(this.nodeToUpdate.createdBy),
    });

  } 
  ngOnInit(): void {
      this.nodeCategoryId=this.nodeToUpdate.nodeCategoryId;
      this.nodeCategoryService.getNodeCategoriesWithNodeCategoryId(this.nodeCategoryId).subscribe(
          (nodeCategorydata)=>
          {
            this.nodeCategoryData=nodeCategorydata;
            this.nodeCategoryName=nodeCategorydata.nodeCategoryName;
            this.updateNodeForm.get("domainId").setValue(this.nodeToUpdate.domainId);
            if(this.nodeCategoryName.includes("Job"))
            {
              this.properties=new FormGroup({
                skillsRequested:new FormControl(this.nodeToUpdate.properties.skillsRequested),
                commonJobTitles: new FormControl(this.nodeToUpdate.properties.commonJobTitles),
                averageSalary : new FormControl(this.nodeToUpdate.properties.averageSalary),
                totalJobOpenings: new FormControl(this.nodeToUpdate.properties.totalJobOpenings),
                requestedEducation:new FormArray([])
              })
              this.skillsRequested=this.nodeToUpdate.properties.skillsRequested;
              this.jobTitles=this.nodeToUpdate.properties.commonJobTitles;
              this.storeEducationDetails();
            }
            else if(this.nodeCategoryName.includes("Learning"))
            {
              this.properties=new FormGroup({
                level:new FormControl(this.nodeToUpdate.properties.level),
                concepts: new FormControl(this.nodeToUpdate.properties.concepts),
                courses : new FormArray([])    
              })
              this.concepts=this.nodeToUpdate.properties.concepts;
              this.storeCourseDetails();
            }
            this.updateNodeForm.addControl("properties",this.properties)
          }
         )
        //console.log(this.updateNodeForm.value);
    }

    addSkills(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
      if (value) {
        this.skillsRequested.push(value);
      }
      event.chipInput!.clear();
    }

    removeSkills(course : String): void {
        const index = this.skillsRequested.indexOf(course);
        if (index >= 0) {
          this.skillsRequested.splice(index, 1);
        }
    }

    addJobTitle(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
      if (value) {
        this.jobTitles.push(value);
      }
      event.chipInput!.clear();
    }

    removeJobTitle(jobTitle : String): void {
      const index = this.jobTitles.indexOf(jobTitle);
      if (index >= 0) {
        this.jobTitles.splice(index, 1);
      }
    }

    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
      if (value) {
        this.concepts.push(value);
      }
      event.chipInput!.clear();
    }

    remove(concept : String): void {
      const index = this.concepts.indexOf(concept);
      if (index >= 0) {
        this.concepts.splice(index, 1);
      }
    }

    get requestedEducationFormArray() {
      return this.properties.get('requestedEducation');
    }

    addEducationDetail() {
      this.formController = this.properties.get('requestedEducation') as FormArray;
      this.formController.push(new FormGroup({
        name : new FormControl(''),
        percentage : new FormControl('')
      }))
    }

    storeEducationDetails(){
      this.formController = this.properties.get('requestedEducation') as FormArray;
      //console.log("length :)",this.nodeToUpdate.properties.requestedEducation[0].name)
      for(let i=0;i<(this.nodeToUpdate.properties.requestedEducation).length;i++){
        this.formController.push(new FormGroup({
        name : new FormControl(this.nodeToUpdate.properties.requestedEducation[i].name),
        percentage : new FormControl(this.nodeToUpdate.properties.requestedEducation[i].percentage)
      }))
      }
    }

    get coursesFormArray() {
      return this.properties.get('courses') as FormArray;
    }

    addCourse() {
      this.formController = this.properties.get('courses') as FormArray;
      this.formController.push(new FormGroup({
        name : new FormControl(''),
        link : new FormControl(''),
        duration : new FormControl('')
      }))
    }

      storeCourseDetails(){
        this.formController = this.properties.get('courses') as FormArray;
        for(let i=0;i<(this.nodeToUpdate.properties.courses).length;i++){
          this.formController.push(new FormGroup({
            name : new FormControl(this.nodeToUpdate.properties.courses[i].name),
            link : new FormControl(this.nodeToUpdate.properties.courses[i].link),
            duration:new FormControl(this.nodeToUpdate.properties.courses[i].duration)
          }))
         }
      }

      deleteCourse(i)
    {
      if(this.formController.length == 1)
      {
        return;
      }
      this.formController.removeAt(i);
    }

    deleteRequestedEducation(i)
    {
      if(this.formController.length == 1)
      {
        return;
      }
      this.formController.removeAt(i);
    }

    onSubmit(event) { 
      event.stopPropagation();
      //console.warn(this.updateNodeForm.value);
      this.nodeService.updateNode(this.updateNodeForm.value).subscribe(
        (updatedNode)=>{
          console.log("Sucessfull",updatedNode);
          this.dialogRef.close();
          window.location.reload();
        },err => {
            console.log(err.message);
          }
      )
    }   
}

