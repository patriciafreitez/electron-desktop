import { TestBed } from '@angular/core/testing';

import { NivelEducativoService } from './nivel-educativo.service';

describe('NivelEducativoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NivelEducativoService = TestBed.get(NivelEducativoService);
    expect(service).toBeTruthy();
  });
});
