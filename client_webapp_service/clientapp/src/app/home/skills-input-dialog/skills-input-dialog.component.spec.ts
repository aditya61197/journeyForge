import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsInputDialogComponent } from './skills-input-dialog.component';

describe('SkillsInputDialogComponent', () => {
  let component: SkillsInputDialogComponent;
  let fixture: ComponentFixture<SkillsInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsInputDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
