import { TestBed } from '@angular/core/testing';

import { PatologiaService } from './patologia.service';

describe('PatologiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatologiaService = TestBed.get(PatologiaService);
    expect(service).toBeTruthy();
  });
});
