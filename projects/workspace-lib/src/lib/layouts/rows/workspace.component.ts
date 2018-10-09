import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { WorkspaceService } from '@workspace/workspace.service';
import { WidgetComponent } from '@workspace/widget-spawner/widget.component';

@Component({
  selector: 'workspace-layout',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})

export class WorkspaceRowsComponent implements OnInit {
  @HostBinding('class') classes = 'content';
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
