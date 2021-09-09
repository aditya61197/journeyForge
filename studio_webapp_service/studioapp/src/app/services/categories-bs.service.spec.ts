import { TestBed } from '@angular/core/testing';

import { CategoriesBsService } from './categories-bs.service';

describe('CategoriesBsService', () => {
  let service: CategoriesBsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesBsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
