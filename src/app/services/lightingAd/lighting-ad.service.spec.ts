import { TestBed } from '@angular/core/testing';

import { LightingAdService } from './lighting-ad.service';

describe('LightingAdService', () => {
  let service: LightingAdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightingAdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
