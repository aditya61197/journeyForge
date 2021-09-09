import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDomainsComponent } from './add-domains.component';

describe('AddDomainsComponent', () => {
  let component: AddDomainsComponent;
  let fixture: ComponentFixture<AddDomainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDomainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
