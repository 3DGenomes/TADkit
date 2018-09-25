import { Component, HostBinding, HostListener, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TkWorkspaceService } from '@workspace/tk-workspace.service';
import { TkProjectsService } from '@projects/tk-projects.service';

import { WidgetComponent } from '@workspace/widget-spawner/widget.component';
import { Observable } from 'rxjs';
import { Project } from '@projects/models/tk-project.model';
import { BindObservable } from 'bind-observable';

import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'tk-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})

export class WorkspaceGridsterComponent implements OnInit {
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
    /* Areas attributes not official Gridster value but to help idenitification */
    this.dashboard = [
      {area: 'spatial', cols: 3, rows: 3, x: 0, y: 0},
      {area: 'matrix',  cols: 9, rows: 3, x: 3, y: 0},
      {area: 'info',    cols: 3, rows: 3, x: 0, y: 3},
      {area: 'tracks',  cols: 9, rows: 3, x: 3, y: 3}
    ];

    this.options = {
      pushItems: true,
      minCols: 6,
      maxCols: 12,
      minRows: 6,
      mobileBreakpoint: 768,
      gridType: 'fit',
      resizable: {
          enabled: true
      },
      draggable: {
          enabled: false
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
