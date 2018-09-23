import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TkWidgetSpawnerComponent } from '@workspace/widget-spawner/tk-widget-spawner.component';

import { TkWorkspaceComponent } from '@workspace/basic2x2/tk-workspace.component';

import { TkWorkspaceResizableComponent } from '@workspace/resizable/row/tk-workspace.component';
import { TkWidgetLayoutComponent } from '@workspace/resizable/tk-widget-resizable.component';
import { TkWidgetDragDirective } from '@workspace/resizable/tk-widget-drag.directive';

import { TkWorkspaceResizableColComponent } from '@workspace/resizable-col/col/tk-workspace-col.component';
import { TkWidgetLayoutColComponent } from '@workspace/resizable-col/tk-widget-resizable-col.component';
import { TkWidgetDragColDirective } from '@workspace/resizable-col/tk-widget-drag-col.directive';

import { TkWorkspaceGridsterComponent } from '@workspace/gridster/tk-workspace.component';

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
    TkWidgetSpawnerComponent,
    TkWorkspaceComponent,
    TkWorkspaceResizableComponent,
    TkWidgetLayoutComponent,
    TkWidgetDragDirective,
    TkWorkspaceResizableColComponent,
    TkWidgetLayoutColComponent,
    TkWidgetDragColDirective,
    TkWorkspaceGridsterComponent,
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class TkWorkspaceModule {}
