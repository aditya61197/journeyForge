import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneymgmtComponent } from './journeymgmt.component';

describe('JourneymgmtComponent', () => {
  let component: JourneymgmtComponent;
  let fixture: ComponentFixture<JourneymgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneymgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneymgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
