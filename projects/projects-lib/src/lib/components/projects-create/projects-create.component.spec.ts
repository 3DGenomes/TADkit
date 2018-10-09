import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsCreateComponent } from './projects-create.component';

describe('ProjectsCreateComponent', () => {
  let component: ProjectsCreateComponent;
  let fixture: ComponentFixture<ProjectsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
