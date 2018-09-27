import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';

import { WorkspaceConfigComponent } from '@workspace/config/workspace-config.component';
import { WorkspaceComponent } from '@workspace/workspace/workspace.component';
import { WidgetSpawnerComponent } from '@workspace/widget-spawner/widget-spawner.component';

import { WorkspaceFixedComponent } from '@workspace/layouts/fixed/workspace.component';

import { WorkspaceRowsComponent } from '@workspace/layouts/rows/workspace.component';
import { WidgetResizableComponent } from '@workspace/layouts/rows/resizable/widget-resizable.component';
import { WidgetDragDirective } from '@workspace/layouts/rows/resizable/widget-drag.directive';

import { WorkspaceColsComponent } from '@workspace/layouts/cols/workspace-col.component';
import { WidgetLayoutColComponent } from '@workspace/layouts/cols/resizable/widget-resizable-col.component';
import { WidgetDragColDirective } from '@workspace/layouts/cols/resizable/widget-drag-col.directive';

import { WorkspaceGridsterComponent } from '@workspace/layouts/gridster/workspace.component';

import { GenomicsLibModule } from 'genomics-lib';
import { GridsterModule } from 'angular-gridster2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProgressSpinnerModule,
    ButtonModule,
    ConfirmDialogModule,
    DropdownModule,
    GridsterModule,
    GenomicsLibModule
  ],
  declarations: [
    WorkspaceConfigComponent,
    WidgetSpawnerComponent,
    WorkspaceComponent,
    WorkspaceFixedComponent,
    WorkspaceRowsComponent,
    WidgetResizableComponent,
    WidgetDragDirective,
    WorkspaceColsComponent,
    WidgetLayoutColComponent,
    WidgetDragColDirective,
    WorkspaceGridsterComponent,
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class WorkspaceModule {}
