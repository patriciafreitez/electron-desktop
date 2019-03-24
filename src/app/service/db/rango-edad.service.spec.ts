import { TestBed } from '@angular/core/testing';

import { RangoEdadService } from './rango-edad.service';

describe('RangoEdadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RangoEdadService = TestBed.get(RangoEdadService);
    expect(service).toBeTruthy();
  });
});
