import { TestBed, inject } from '@angular/core/testing';

import { ThreeLibService } from './three-lib.service';

describe('ThreeLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThreeLibService]
    });
  });

  it('should be created', inject([ThreeLibService], (service: ThreeLibService) => {
    expect(service).toBeTruthy();
  }));
});
