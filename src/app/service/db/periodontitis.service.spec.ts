import { TestBed } from '@angular/core/testing';

import { PeriodontitisService } from './periodontitis.service';

describe('PeriodontitisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeriodontitisService = TestBed.get(PeriodontitisService);
    expect(service).toBeTruthy();
  });
});
