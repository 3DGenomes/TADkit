import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsBriefComponent } from './projects-brief.component';

describe('ProjectsBriefComponent', () => {
  let component: ProjectsBriefComponent;
  let fixture: ComponentFixture<ProjectsBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
