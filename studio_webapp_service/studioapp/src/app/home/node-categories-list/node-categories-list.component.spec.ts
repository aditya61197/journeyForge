import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeCategoriesListComponent } from './node-categories-list.component';

describe('NodeCategoriesListComponent', () => {
  let component: NodeCategoriesListComponent;
  let fixture: ComponentFixture<NodeCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeCategoriesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
