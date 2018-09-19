import { Component, HostBinding, HostListener, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TkWorkspaceService } from '@workspace/tk-workspace.service';
import { TkProjectsService } from '@projects/tk-projects.service';

import { WidgetComponent } from '@workspace/widget-spawner/tk-widget.component';
import { Observable } from 'rxjs';
import { Project } from '@projects/models/tk-project.model';
import { BindObservable } from 'bind-observable';

import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'tk-workspace',
  templateUrl: './tk-workspace.component.html',
  styleUrls: ['./tk-workspace.component.scss']
})

export class TkWorkspaceGridsterComponent implements OnInit {
  @HostBinding('class') classes = 'workspace';

  private widgets: WidgetComponent[] = [];
  public options: GridsterConfig;
  public dashboard: GridsterItem[];

  @BindObservable('dataStream') private data: Project;
  public dataStream: Observable<Project>;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.options.api && this.options.api.resize) {
      console.log('resizing');
      this.options.api.resize();
    }
  }

  constructor(
    private tkWorkspaceService: TkWorkspaceService,
    private tkProjectsService: TkProjectsService
  ) {
    // spatial, info, matrix, tracks
    this.dashboard = [
      {x: 0, y: 0, rows: 6, cols: 6},
      {x: 6, y: 0, rows: 6, cols: 6},
      {x: 0, y: 6, rows: 6, cols: 6},
      {x: 6, y: 6, rows: 6, cols: 6}
    ];

    this.options = {
      pushItems: true,
      minCols: 12,
      maxCols: 12,
      minRows: 12,
      mobileBreakpoint: 768,
      gridType: 'fit',
      resizable: {
          enabled: true
      },
      draggable: {
          enabled: true
      },
      margin: 8
   };

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
    // this.tkWorkspaceService.addWidgets(widgetName);
  }
}
