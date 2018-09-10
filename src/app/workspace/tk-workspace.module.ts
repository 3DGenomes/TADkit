import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TkWorkspaceComponent } from '@workspace/tk-workspace.component';
import { TkWidgetSpawnerComponent } from '@workspace/widget-spawner/tk-widget-spawner.component';

import { TkWidgetRegionComponent } from './widget-resizable/tk-widget-resizable.component';
import { TkWidgetDragDirective } from '@workspace/widget-resizable/tk-widget-drag.directive';

import { GenomicsLibModule } from 'genomics-lib';

@NgModule({
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ButtonModule,
    ConfirmDialogModule,
    GenomicsLibModule
  ],
  declarations: [
    TkWorkspaceComponent,
    TkWidgetSpawnerComponent,
    TkWidgetRegionComponent,
    TkWidgetDragDirective,
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class TkWorkspaceModule {}
