import { TestBed } from '@angular/core/testing';

import { EpsService } from './eps.service';

describe('EpsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EpsService = TestBed.get(EpsService);
    expect(service).toBeTruthy();
  });
});
