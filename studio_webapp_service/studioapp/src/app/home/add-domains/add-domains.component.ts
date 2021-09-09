import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormGroup, FormControl } from '@angular/forms';
import { DomainService } from 'src/app/services/domain.service';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-add-domains',
  templateUrl: './add-domains.component.html',
  styleUrls: ['./add-domains.component.css']
})
export class AddDomainsComponent implements OnInit {

  createDomain: FormGroup;
  domainsAPI: String = "";
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  
  dummyUrl: string = "https://cdn.pixabay.com/photo/2019/01/31/20/52/web-3967926__480.jpg";
  constructor(private domainService:DomainService, private dialogRef:MatDialog) {

  }

  ngOnInit() {
    

    this.createDomain = new FormGroup({
      domainName: new FormControl(''),
      domainDescription: new FormControl(''),
      domainImage: new FormControl(''),
      tags : new FormControl([])

    });

  }
  get tags() {
    return this.createDomain.get('tags');
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.setValue([...this.tags.value, value.trim()]);
      this.tags.updateValueAndValidity();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tags.value.indexOf(tag);

    if (index >= 0) {
      this.tags.value.splice(index, 1);
      this.tags.updateValueAndValidity();
    }
  }
  onSubmit(data) {
    if (data.domainImage == null || data.domainImage == undefined || data.domainImage == "") {
      data.domainImage = this.dummyUrl;
    }
    this.domainService.CreateDomain(data).subscribe((result) => {
      console.log("result", result);

    })
  }
  domaincreated(){
    this.dialogRef.closeAll();
    window.location.reload();
  }

}


