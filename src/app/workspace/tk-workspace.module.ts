import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TkWorkspaceComponent } from '@workspace/basic2x2/tk-workspace.component';
import { TkWorkspaceResizableColComponent } from '@workspace/resizable/col/tk-workspace-col.component';
import { TkWorkspaceResizableRowComponent } from '@workspace/resizable/row/tk-workspace-row.component';
import { TkWorkspaceGridsterComponent } from '@workspace/gridster/tk-workspace.component';
import { TkWidgetSpawnerComponent } from '@workspace/widget-spawner/tk-widget-spawner.component';

import { TkWidgetLayoutComponent } from './resizable/tk-widget-resizable.component';
import { TkWidgetDragDirective } from '@workspace/resizable/tk-widget-drag.directive';

import { GenomicsLibModule } from 'genomics-lib';
import { GridsterModule } from 'angular-gridster2';

@NgModule({
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ButtonModule,
    ConfirmDialogModule,
    GridsterModule,
    GenomicsLibModule
  ],
  declarations: [
    TkWorkspaceComponent,
    TkWorkspaceResizableColComponent,
    TkWorkspaceResizableRowComponent,
    TkWorkspaceGridsterComponent,
    TkWidgetSpawnerComponent,
    TkWidgetLayoutComponent,
    TkWidgetDragDirective,
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class TkWorkspaceModule {}
