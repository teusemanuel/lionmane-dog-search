import { TestBed } from '@angular/core/testing';
import { RequestCacheService } from '@app/core/services/core/request-cache.service';

describe('RequestCacheService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: RequestCacheService = TestBed.inject(RequestCacheService);
		expect(service).toBeTruthy();
	});
});
