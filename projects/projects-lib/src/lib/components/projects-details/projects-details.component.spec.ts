import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDetailsComponent } from './projects-details.component';

describe('ProjectsDetailsComponent', () => {
  let component: ProjectsDetailsComponent;
  let fixture: ComponentFixture<ProjectsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
