import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyviewComponent } from './journeyview.component';

describe('JourneyviewComponent', () => {
  let component: JourneyviewComponent;
  let fixture: ComponentFixture<JourneyviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneyviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
