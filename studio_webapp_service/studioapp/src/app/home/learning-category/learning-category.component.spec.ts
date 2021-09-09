import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningCategoryComponent } from './learning-category.component';

describe('LearningCategoryComponent', () => {
  let component: LearningCategoryComponent;
  let fixture: ComponentFixture<LearningCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
