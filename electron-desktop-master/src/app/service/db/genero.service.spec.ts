import { TestBed } from '@angular/core/testing';

import { GeneroService } from './genero.service';

describe('GeneroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneroService = TestBed.get(GeneroService);
    expect(service).toBeTruthy();
  });
});
