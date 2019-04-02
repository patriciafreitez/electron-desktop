import { TestBed } from '@angular/core/testing';

import { EstadoCivilService } from './estado-civil.service';

describe('EstadoCivilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadoCivilService = TestBed.get(EstadoCivilService);
    expect(service).toBeTruthy();
  });
});
