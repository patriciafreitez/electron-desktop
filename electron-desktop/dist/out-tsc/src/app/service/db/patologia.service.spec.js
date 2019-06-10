import { TestBed } from '@angular/core/testing';
import { PatologiaService } from './patologia.service';
describe('PatologiaService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(PatologiaService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=patologia.service.spec.js.map