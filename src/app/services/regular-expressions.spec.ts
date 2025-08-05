import { TestBed } from '@angular/core/testing';

import { RegularExpressions } from './regular-expressions';

describe('RegularExpressions', () => {
  let service: RegularExpressions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegularExpressions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
