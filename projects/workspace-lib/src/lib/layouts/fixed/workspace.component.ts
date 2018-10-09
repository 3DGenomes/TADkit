import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { WorkspaceService } from '@workspace/workspace.service';
import { WidgetComponent } from '@workspace/widget-spawner/widget.component';

@Component({
  selector: 'workspace-layout',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})

export class WorkspaceFixedComponent implements OnInit {
  @HostBinding('class') classes = 'workspace';
  @Input() dataStream: any;

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
