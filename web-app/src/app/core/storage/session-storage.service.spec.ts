import { TestBed } from '@angular/core/testing';
import { SessionStorageService } from '@app/core/storage/session-storage.service';

describe('SessionStorageService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: SessionStorageService = TestBed.inject(SessionStorageService);
		expect(service).toBeTruthy();
	});
});
