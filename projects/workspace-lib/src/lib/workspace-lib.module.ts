import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';

import { WorkspaceConfigComponent } from './config/workspace-config.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { WidgetSpawnerComponent } from './widget-spawner/widget-spawner.component';

import { WorkspaceFixedComponent } from './layouts/fixed/workspace.component';

import { NgxResizableModule } from '@3dgenomes/ngx-resizable';
import { WorkspaceRowsComponent } from './layouts/rows/workspace.component';
import { WorkspaceColsComponent } from './layouts/cols/workspace.component';

import { GridsterModule } from 'angular-gridster2';
import { WorkspaceGridsterComponent } from './layouts/gridster/workspace.component';

import { GenomicsLibModule } from 'genomics-lib';
import { ProjectsLibModule } from 'projects-lib';

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
    ProjectsLibModule
  ],
  declarations: [
    WorkspaceConfigComponent,
    WidgetSpawnerComponent,
    WorkspaceComponent,
    WorkspaceFixedComponent,
    WorkspaceRowsComponent,
    WorkspaceColsComponent,
    WorkspaceGridsterComponent,
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
export class WorkspaceLibModule {}
