import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';

import { WorkspaceConfigComponent } from '@workspace/config/workspace-config.component';
import { WorkspaceComponent } from '@workspace/workspace.component';
import { WidgetSpawnerComponent } from '@workspace/widget-spawner/widget-spawner.component';

import { WorkspaceFixedComponent } from '@workspace/layouts/fixed/workspace.component';

import { NgxResizableModule } from '@3dgenomes/ngx-resizable';
import { WorkspaceRowsComponent } from '@workspace/layouts/rows/workspace.component';
import { WorkspaceColsComponent } from '@workspace/layouts/cols/workspace.component';

import { GridsterModule } from 'angular-gridster2';
import { WorkspaceGridsterComponent } from '@workspace/layouts/gridster/workspace.component';

import { GenomicsLibModule } from 'genomics-lib';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProgressSpinnerModule,
    ButtonModule,
    ConfirmDialogModule,
    DropdownModule,
    NgxResizableModule,
    GridsterModule,
    GenomicsLibModule,
  ],
  declarations: [
    WorkspaceConfigComponent,
    WidgetSpawnerComponent,
    WorkspaceComponent,
    WorkspaceFixedComponent,
    WorkspaceRowsComponent,
    WorkspaceColsComponent,
    WorkspaceGridsterComponent
  ],
  exports: [],
  providers: [],
  entryComponents: [
    WorkspaceFixedComponent,
    WorkspaceRowsComponent,
    WorkspaceColsComponent,
    WorkspaceGridsterComponent
  ]
})
export class WorkspaceModule {}
