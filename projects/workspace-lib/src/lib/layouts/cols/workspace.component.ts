import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { WorkspaceService } from '../../workspace-lib.service';
import { WidgetComponent } from '../../widget-spawner/widget.component';

@Component({
  selector: 'workspace-layout',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})

export class WorkspaceColsComponent implements OnInit {
  @HostBinding('class') classes = 'content cols';
  @Input() dataStream: any;

  public widgets: WidgetComponent[] = [];

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
