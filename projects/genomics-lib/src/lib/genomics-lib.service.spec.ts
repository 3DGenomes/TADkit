import { TestBed, inject } from '@angular/core/testing';

import { GenomicsLibService } from './genomics-lib.service';

describe('GenomicsLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenomicsLibService]
    });
  });

  it('should be created', inject([GenomicsLibService], (service: GenomicsLibService) => {
    expect(service).toBeTruthy();
  }));
});
