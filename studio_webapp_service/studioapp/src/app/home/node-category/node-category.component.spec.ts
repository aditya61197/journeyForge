import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeCategoryComponent } from './node-category.component';

describe('NodeCategoryComponent', () => {
  let component: NodeCategoryComponent;
  let fixture: ComponentFixture<NodeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
