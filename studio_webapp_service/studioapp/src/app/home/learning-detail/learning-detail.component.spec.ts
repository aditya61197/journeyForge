import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningDetailComponent } from './learning-detail.component';

describe('LearningDetailComponent', () => {
  let component: LearningDetailComponent;
  let fixture: ComponentFixture<LearningDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
