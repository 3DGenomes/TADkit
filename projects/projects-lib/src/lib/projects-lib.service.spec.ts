import { TestBed } from '@angular/core/testing';

import { ProjectsLibService } from './projects-lib.service';

describe('ProjectsLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectsLibService = TestBed.get(ProjectsLibService);
    expect(service).toBeTruthy();
  });
});
