import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDetailDialogComponent } from './node-detail-dialog.component';

describe('NodeDetailDialogComponent', () => {
  let component: NodeDetailDialogComponent;
  let fixture: ComponentFixture<NodeDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
