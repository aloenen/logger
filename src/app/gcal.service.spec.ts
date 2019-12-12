import { TestBed } from '@angular/core/testing';

import { GcalService } from './gcal.service';

describe('GcalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GcalService = TestBed.get(GcalService);
    expect(service).toBeTruthy();
  });
});
