import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { WorkspaceConfigComponent } from '@workspace/config/workspace-config.component';
import { WidgetSpawnerComponent } from '@workspace/widget-spawner/widget-spawner.component';

import { WorkspaceComponent } from '@workspace/layouts/basic2x2/workspace.component';

import { WorkspaceResizableComponent } from '@workspace/layouts/resizable/row/workspace.component';
import { WidgetLayoutComponent } from '@workspace/layouts/resizable/widget-resizable.component';
import { WidgetDragDirective } from '@workspace/layouts/resizable/widget-drag.directive';

import { WorkspaceResizableColComponent } from '@workspace/layouts/resizable-col/col/workspace-col.component';
import { WidgetLayoutColComponent } from '@workspace/layouts/resizable-col/widget-resizable-col.component';
import { WidgetDragColDirective } from '@workspace/layouts/resizable-col/widget-drag-col.directive';

import { WorkspaceGridsterComponent } from '@workspace/layouts/gridster/workspace.component';

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
    WorkspaceConfigComponent,
    WidgetSpawnerComponent,
    WorkspaceComponent,
    WorkspaceResizableComponent,
    WidgetLayoutComponent,
    WidgetDragDirective,
    WorkspaceResizableColComponent,
    WidgetLayoutColComponent,
    WidgetDragColDirective,
    WorkspaceGridsterComponent,
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class TkWorkspaceModule {}
