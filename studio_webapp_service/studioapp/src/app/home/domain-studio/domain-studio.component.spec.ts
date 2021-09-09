import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainStudioComponent } from './domain-studio.component';

describe('DomainStudioComponent', () => {
  let component: DomainStudioComponent;
  let fixture: ComponentFixture<DomainStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainStudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
