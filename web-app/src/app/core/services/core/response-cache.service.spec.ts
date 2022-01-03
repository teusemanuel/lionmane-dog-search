import { TestBed } from '@angular/core/testing';

import { ResponseCacheService } from './response-cache.service';

describe('ResponseCacheService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: ResponseCacheService = TestBed.inject(ResponseCacheService);
		expect(service).toBeTruthy();
	});
});
