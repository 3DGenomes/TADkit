import { Component, HostBinding, OnInit } from '@angular/core';
import { WorkspaceService } from '@workspace/workspace.service';
import { ProjectsService } from '@projects/projects.service';

import { WidgetComponent } from '@workspace/widget-spawner/widget.component';
import { Observable } from 'rxjs';
import { Project } from '@projects/models/tk-project.model';
import { BindObservable } from 'bind-observable';

@Component({
  selector: 'tk-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})

export class WorkspaceComponent implements OnInit {
  @HostBinding('class') classes = 'workspace';

  private widgets: WidgetComponent[] = [];

  @BindObservable('dataStream') private data: Project;
  public dataStream: Observable<Project>;

  constructor(
    private workspaceService: WorkspaceService,
    private projectsService: ProjectsService
  ) {
    this.workspaceService.widgets.subscribe(wgts => this.widgets = wgts);
    this.projectsService.currentProject.subscribe(prj => this.data = prj);
  }

  public ngOnInit() {
    this.initializeWorkspace();
  }

  private initializeWorkspace(): void {
    this.workspaceService.loadWidgets();
  }

  public addWidget(widgetName): void {
    this.workspaceService.addWidgets(widgetName);
  }
}
