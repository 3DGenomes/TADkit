import { Component, OnInit, Input, ViewChild, ViewContainerRef,  ComponentFactoryResolver } from '@angular/core';
import { Workspace } from './workspace';
import { BindObservable } from 'bind-observable';
import { Project } from '@projects/models/tk-project.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectsService } from '@projects/projects.service';
// import * as workspaceLayouts from 'workspaces-lib';
import { WorkspaceFixedComponent } from '../layouts/fixed/workspace.component';
import { WorkspaceRowsComponent } from '@workspace/layouts/rows/workspace.component';
import { WorkspaceColsComponent } from '@workspace/layouts/cols/workspace-col.component';
import { WorkspaceGridsterComponent } from '../layouts/gridster/workspace.component';

@Component({
  selector: 'tk-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  @ViewChild('workspace', {read: ViewContainerRef}) routespace;

  // private workspacesStream: BehaviorSubject<Workspace[]>;
  // public workspaces: Observable<Workspace[]>;
  public currentWorkspace: Workspace;

  @BindObservable('dataStream') private data: Project;
  public dataStream: Observable<Project>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private projectsService: ProjectsService
  ) {
    // this.workspacesStream = new BehaviorSubject<Workspace[]>([]);
    // this.workspaces = this.workspacesStream.asObservable();
    this.projectsService.currentProject.subscribe(prj => this.data = prj);
  }

  ngOnInit() {
    this.loadWorkpace();
  }

  public setWorkspace(workspaceName?: string): void {
    // const workspaceComponent = workspaceLayouts[workspaceName];
    // if (!workspaceName) {}; // USE DEFAULT???
    this.currentWorkspace = new Workspace(WorkspaceRowsComponent, null);
  }

  loadWorkpace() {
    this.setWorkspace();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.currentWorkspace.component);
    this.routespace.clear();
    const componentRef = this.routespace.createComponent(componentFactory);
    (componentRef.instance).dataStream = this.dataStream;
  }

}
