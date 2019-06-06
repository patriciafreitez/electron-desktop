import { TestBed } from '@angular/core/testing';

import { NivelSocioeconomicoService } from './nivel-socioeconomico.service';

describe('NivelSocioeconomicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NivelSocioeconomicoService = TestBed.get(NivelSocioeconomicoService);
    expect(service).toBeTruthy();
  });
});
