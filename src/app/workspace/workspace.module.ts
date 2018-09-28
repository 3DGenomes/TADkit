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

import { ResizableComponent } from '@workspace/layouts/resizable/resizable.component';
import { DragDirective } from '@workspace/layouts/resizable/drag.directive';
import { WorkspaceRowsComponent } from '@workspace/layouts/rows/workspace.component';
import { WorkspaceColsComponent } from '@workspace/layouts/cols/workspace.component';

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
    ResizableComponent,
    DragDirective,
    WorkspaceColsComponent,
    WorkspaceGridsterComponent,
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class WorkspaceModule {}
