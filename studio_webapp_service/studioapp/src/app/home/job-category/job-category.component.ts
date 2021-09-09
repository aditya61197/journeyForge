import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { CategoriesBsService } from 'src/app/services/categories-bs.service';


export interface RequestedEducation {
  name: String;
  percentage : String;
}


@Component({
  selector: 'app-job-category',
  templateUrl: './job-category.component.html',
  styleUrls: ['./job-category.component.css']
})
export class JobCategoryComponent implements OnInit {
  
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @Input() myForm : FormGroup;
  properties : FormGroup;

  // matchip list
  skillsRequested : String[] = [];
  jobTitles : String[] = [];
  requestedEducation : RequestedEducation[] = [];

  formController : FormArray;

  constructor(private categoriesBsService : CategoriesBsService) { }

  ngOnInit(): void {
    this.properties = this.myForm.get('properties') as FormGroup;
    this.properties.removeControl('concepts');
    this.properties.removeControl('level');
    this.properties.removeControl('courses');
    this.properties.addControl('skillsRequested', new FormControl(''));
    this.properties.addControl('commonJobTitles', new FormControl(''));
    this.properties.addControl('averageSalary', new FormControl(''));
    this.properties.addControl('totalJobOpenings', new FormControl(''));
    this.properties.addControl('requestedEducation', new FormArray([]));
    this.addEducationDetail();

    this.categoriesBsService.jobTitleListBS.subscribe(
      (jobTitles)=>{
        this.jobTitles = jobTitles;
      }
    )

    this.categoriesBsService.requestedEducationBS.subscribe(
      (requestedEducation)=>{
        this.requestedEducation = requestedEducation;
      }
    )

    this.categoriesBsService.skillsRequestedBS.subscribe(
      (skillsRequested)=>{
        this.skillsRequested = skillsRequested;
      }
    )

    this.formController = this.properties.get('requestedEducation') as FormArray;

  }

  get requestedEducationFormArray() {
    return this.properties.get('requestedEducation') as FormArray;
  }

  deleteRequestedEducation(i)
  {
    if(this.formController.length == 1)
    {
      return;
    }
    this.formController.removeAt(i);
    this.categoriesBsService.requestedEducationBS.next(this.formController.value);
    // console.log(this.formController.value)
    // this.categoriesBsService.requestedEducationBS.next(this.formController.value);
  }

  addEducationDetail() {
    this.formController = this.properties.get('requestedEducation') as FormArray;
    this.formController.push(new FormGroup({
      name : new FormControl(''),
      percentage : new FormControl('')
    }))
    this.categoriesBsService.requestedEducationBS.next(this.formController.value);
    // console.log(this.formController.value)
  }

  typingEdu()
  {
    this.categoriesBsService.requestedEducationBS.next(this.formController.value);
  }

  addSkills(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.skillsRequested.push(value);
      this.categoriesBsService.skillsRequestedBS.next(this.skillsRequested);
    }
    event.chipInput!.clear();
  }


  removeSkills(course : String): void {
    const index = this.skillsRequested.indexOf(course);

    if (index >= 0) {
      this.skillsRequested.splice(index, 1);
      this.categoriesBsService.skillsRequestedBS.next(this.skillsRequested);
    }
  }

  addJobTitle(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.jobTitles.push(value);
      this.categoriesBsService.jobTitleListBS.next(this.jobTitles);
    }
    event.chipInput!.clear();
  }


  removeJobTitle(jobTitle : String): void {
    const index = this.jobTitles.indexOf(jobTitle);

    if (index >= 0) {
      this.jobTitles.splice(index, 1);
      this.categoriesBsService.jobTitleListBS.next(this.jobTitles);
    }
  }
  

}
