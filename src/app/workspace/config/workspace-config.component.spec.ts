import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceConfigComponent } from './workspace-config.component';

describe('WorkspaceConfigComponent', () => {
  let component: WorkspaceConfigComponent;
  let fixture: ComponentFixture<WorkspaceConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
