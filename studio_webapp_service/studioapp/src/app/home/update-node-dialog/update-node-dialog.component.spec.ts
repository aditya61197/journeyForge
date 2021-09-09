import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNodeDialogComponent } from './update-node-dialog.component';

describe('UpdateNodeDialogComponent', () => {
  let component: UpdateNodeDialogComponent;
  let fixture: ComponentFixture<UpdateNodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNodeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
