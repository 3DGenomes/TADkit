import { TestBed, inject } from '@angular/core/testing';

import { TkProjectsService } from '@projects/tk-projects.service';

describe('TkProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TkProjectsService]
    });
  });

  it('should be created', inject([TkProjectsService], (service: TkProjectsService) => {
    expect(service).toBeTruthy();
  }));
});
