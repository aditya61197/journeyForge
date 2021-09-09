import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneygraphComponent } from './journeygraph.component';

describe('JourneygraphComponent', () => {
  let component: JourneygraphComponent;
  let fixture: ComponentFixture<JourneygraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneygraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneygraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
