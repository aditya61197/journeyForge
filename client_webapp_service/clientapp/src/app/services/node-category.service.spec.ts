import { TestBed } from '@angular/core/testing';

import { NodeCategoryService } from './node-category.service';

describe('NodeCategoryService', () => {
  let service: NodeCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
