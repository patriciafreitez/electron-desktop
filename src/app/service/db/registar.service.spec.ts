import { TestBed } from '@angular/core/testing';

import { RegistarService } from './registar.service';

describe('RegistarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistarService = TestBed.get(RegistarService);
    expect(service).toBeTruthy();
  });
});
