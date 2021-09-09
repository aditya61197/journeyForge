import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgModel } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { BehaviorSubject } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { CategoriesBsService } from 'src/app/services/categories-bs.service';

export interface Course {
  name: String;
  link: String;
  duration : String;
}

@Component({
  selector: 'app-learning-category',
  templateUrl: './learning-category.component.html',
  styleUrls: ['./learning-category.component.css']
})
export class LearningCategoryComponent implements OnInit {

  @Input() myForm : FormGroup;

  properties : FormGroup;

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  formController : FormArray;

  // matchip list
  concepts : String[] = [];

  courses : Course[] = [];



  constructor(private elementRef : ElementRef, private categoriesBsService : CategoriesBsService) { }

  ngOnInit(): void {
    this.properties = this.myForm.get('properties') as FormGroup;
    this.properties.removeControl('skillsRequested');
    this.properties.removeControl('averageSalary');
    this.properties.removeControl('totalJobOpenings');
    this.properties.removeControl('requestedEducation');
    this.properties.removeControl('commonJobTitles');
    this.properties.addControl('concepts', new FormControl(''));
    this.properties.addControl('level', new FormControl(''));
    this.properties.addControl('courses', new FormArray([]));
    this.addCourse();

    this.categoriesBsService.conceptsListBS.subscribe(
      (concepts) => {
        this.concepts = concepts;
      }
    )

    this.formController = this.properties.get('courses') as FormArray;
  }


  get coursesFormArray() {
    return this.properties.get('courses') as FormArray;
  }

  typingCourse()
  {
    this.categoriesBsService.coursesListBS.next(this.formController.value);
  }


  deleteCourse(i)
  {
    if(this.formController.length == 1)
    {
      return;
    }
    this.formController.removeAt(i);
    this.categoriesBsService.coursesListBS.next(this.formController.value);
  }


  addCourse() {
    this.formController = this.properties.get('courses') as FormArray;
    this.formController.push(new FormGroup({
      name : new FormControl(''),
      link : new FormControl(''),
      duration : new FormControl('')
    }))
    this.categoriesBsService.coursesListBS.next(this.formController.value);
    // console.log(this.formController.value)
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.concepts.push(value);
      this.categoriesBsService.conceptsListBS.next(this.concepts);
    }
    event.chipInput!.clear();
  }


  remove(concept : String): void {
    const index = this.concepts.indexOf(concept);

    if (index >= 0) {
      this.concepts.splice(index, 1);
      this.categoriesBsService.conceptsListBS.next(this.concepts);
    }
  }

}
