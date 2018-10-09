import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';

import { WorkspaceService } from '@workspace/workspace.service';
// import { Layout } from '@workspace/layouts/layout';

@Component({
  selector: 'workspace-config',
  templateUrl: './workspace-config.component.html',
  styleUrls: ['./workspace-config.component.css'],
})
export class WorkspaceConfigComponent implements OnInit {
  public layouts: SelectItem[];
  public layout = 'fixed';

  constructor(private workspaceService: WorkspaceService) {
    this.layouts = [
      { label: 'Fixed', value: 'fixed'},
      { label: 'Rows', value: 'rows'},
      { label: 'Columns', value: 'cols'},
      { label: 'Gridster', value: 'gridster'}
    ];
  }

  ngOnInit() {
    // this.form = new FormGroup({
    //   title: new FormControl()
    // });
  }

  public onChange() {
    // this.workspaceService.layouts.subscribe(lyts => this.layouts = lyts);
    console.log(this.layout);
  }

}
