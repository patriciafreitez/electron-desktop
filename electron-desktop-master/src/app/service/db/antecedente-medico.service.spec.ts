import { TestBed } from '@angular/core/testing';

import { AntecedenteMedicoService } from './antecedente-medico.service';

describe('AntecedenteMedicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AntecedenteMedicoService = TestBed.get(AntecedenteMedicoService);
    expect(service).toBeTruthy();
  });
});
