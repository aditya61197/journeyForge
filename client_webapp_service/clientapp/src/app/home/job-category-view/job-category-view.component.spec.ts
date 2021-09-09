import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCategoryViewComponent } from './job-category-view.component';

describe('JobCategoryViewComponent', () => {
  let component: JobCategoryViewComponent;
  let fixture: ComponentFixture<JobCategoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCategoryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
