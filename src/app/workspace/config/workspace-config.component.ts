import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';

import { WorkspaceService } from '@workspace/workspace.service';
import { Layout } from '@workspace/layouts/layout';

@Component({
  selector: 'tk-workspace-config',
  templateUrl: './workspace-config.component.html',
  styleUrls: ['./workspace-config.component.css'],
})
export class WorkspaceConfigComponent implements OnInit {
  public layouts: SelectItem[];
  public layout = 'basic2x2';

  constructor(private workspaceService: WorkspaceService) {
    this.layouts = [
      { label: 'Basic 2x2', value: 'basic2x2'},
      { label: 'Resizable Columns', value: 'resizable-col'},
      { label: 'Resizable Rows', value: 'resizable'},
      { label: 'Gridster', value: 'gridster'}
    ];
  }

  ngOnInit() {
    // this.form = new FormGroup({
    //   title: new FormControl()
    // });
  }

  private onSubmit() {
    // this.workspaceService.layouts.subscribe(lyts => this.layouts = lyts);
    console.log(this.layouts);
  }

}
