import { Component, OnInit, Input, ViewChild, ViewContainerRef,  ComponentFactoryResolver } from '@angular/core';
import { Workspace } from './workspace';
import { BindObservable } from 'bind-observable';
import { Project } from 'projects-lib';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectsLibService } from 'projects-lib';
// import * as workspaceLayouts from 'workspaces-lib';
import { WorkspaceFixedComponent } from '../layouts/fixed/workspace.component';
import { WorkspaceRowsComponent } from '../layouts/rows/workspace.component';
import { WorkspaceColsComponent } from '../layouts/cols/workspace.component';
import { WorkspaceGridsterComponent } from '../layouts/gridster/workspace.component';

@Component({
  selector: 'workspace-layout',
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
    private projectsService: ProjectsLibService
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
    this.currentWorkspace = new Workspace(WorkspaceColsComponent, null);
  }

  loadWorkpace() {
    this.setWorkspace();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.currentWorkspace.component);
    this.routespace.clear();
    const componentRef = this.routespace.createComponent(componentFactory);
    (componentRef.instance).dataStream = this.dataStream;
  }

}
