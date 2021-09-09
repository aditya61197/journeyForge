import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningCategoryViewComponent } from './learning-category-view.component';

describe('LearningCategoryViewComponent', () => {
  let component: LearningCategoryViewComponent;
  let fixture: ComponentFixture<LearningCategoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningCategoryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
