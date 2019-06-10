import { TestBed } from '@angular/core/testing';
import { PacienteService } from './paciente.service';
describe('PacienteService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(PacienteService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=paciente.service.spec.js.map