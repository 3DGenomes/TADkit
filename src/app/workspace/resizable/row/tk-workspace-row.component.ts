import { Component, HostBinding, OnInit } from '@angular/core';
import { TkWorkspaceService } from '@workspace/tk-workspace.service';
import { TkProjectsService } from '@projects/tk-projects.service';

import { WidgetComponent } from '@workspace/widget-spawner/tk-widget.component';
import { Observable } from 'rxjs';
import { Project } from '@projects/models/tk-project.model';
import { BindObservable } from 'bind-observable';

@Component({
  selector: 'tk-workspace',
  templateUrl: './tk-workspace-row.component.html',
  styleUrls: ['./tk-workspace-row.component.scss']
})

export class TkWorkspaceResizableRowComponent implements OnInit {
  @HostBinding('class') classes = 'workspace';

  private widgets: WidgetComponent[] = [];

  @BindObservable('dataStream') private data: Project;
  public dataStream: Observable<Project>;

  constructor(
    private tkWorkspaceService: TkWorkspaceService,
    private tkProjectsService: TkProjectsService
  ) {
    this.tkWorkspaceService.widgets.subscribe(wgts => this.widgets = wgts);
    this.tkProjectsService.currentProject.subscribe(prj => this.data = prj);
  }

  public ngOnInit() {
    this.initializeWorkspace();
  }

  private initializeWorkspace(): void {
    this.tkWorkspaceService.loadWidgets();
  }

  public addWidget(widgetName): void {
    this.tkWorkspaceService.addWidgets(widgetName);
  }
}
