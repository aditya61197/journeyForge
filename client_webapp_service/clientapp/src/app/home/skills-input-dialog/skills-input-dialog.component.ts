import { Component, OnInit , Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-skills-input-dialog',
  templateUrl: './skills-input-dialog.component.html',
  styleUrls: ['./skills-input-dialog.component.css']
})
export class SkillsInputDialogComponent implements OnInit {

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  interests : String[] = [];

  constructor(public dialogRef: MatDialogRef<SkillsInputDialogComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.interests.push(value);
    }
    event.chipInput!.clear();
  }

  remove(interest: String): void {
    const index = this.interests.indexOf(interest);

    if (index >= 0) {
      this.interests.splice(index, 1);
    }
  }
}
