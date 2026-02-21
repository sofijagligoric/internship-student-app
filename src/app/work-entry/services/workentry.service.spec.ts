import { TestBed } from '@angular/core/testing';

import { WorkentryService } from './workentry.service';

describe('WorkentryService', () => {
  let service: WorkentryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkentryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
