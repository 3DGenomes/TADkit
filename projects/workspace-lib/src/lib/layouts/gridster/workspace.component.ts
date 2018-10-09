import { Component, HostBinding, Input, HostListener, OnInit } from '@angular/core';
import { WorkspaceService } from '@workspace/workspace.service';
import { WidgetComponent } from '@workspace/widget-spawner/widget.component';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'workspace-layout',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})

export class WorkspaceGridsterComponent implements OnInit {
  @HostBinding('class') classes = 'workspace';
  @Input() dataStream: any;

  private widgets: WidgetComponent[] = [];
  public options: GridsterConfig;
  public dashboard: GridsterItem[];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.options.api && this.options.api.resize) {
      console.log('resizing');
      this.options.api.resize();
    }
  }

  constructor(
    private workspaceService: WorkspaceService,
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

    this.workspaceService.widgets.subscribe(wgts => this.widgets = wgts);
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
