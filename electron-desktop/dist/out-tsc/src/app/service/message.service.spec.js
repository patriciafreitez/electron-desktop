import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
describe('MessageService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(MessageService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=message.service.spec.js.map