import { Component, HostBinding, OnInit } from '@angular/core';
import { WorkspaceService } from '@workspace/workspace.service';
import { WidgetComponent } from '@workspace/widget-spawner/widget.component';

@Component({
  selector: 'tk-workspace-layout',
  templateUrl: './workspace-col.component.html',
  styleUrls: ['./workspace-col.component.scss']
})

export class WorkspaceColsComponent implements OnInit {
  @HostBinding('class') classes = 'content-col';

  private widgets: WidgetComponent[] = [];

  constructor(
    private workspaceService: WorkspaceService,
  ) {
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
