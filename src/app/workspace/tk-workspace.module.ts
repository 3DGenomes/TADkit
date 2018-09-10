import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TkWorkspaceComponent } from '@workspace/tk-workspace.component';
import { TkWidgetSpawnerComponent } from '@workspace/widget-spawner/tk-widget-spawner.component';

import { TkWidgetRegionComponent } from './widget-resizable/tk-widget-resizable.component';
import { TkWidgetDragDirective } from '@workspace/widget-resizable/tk-widget-drag.directive';

import { TkGenomicsInfoComponent } from '@workspace/components/genomics-info/tk-genomics-info.component';
import { TkGenomicsMatrixComponent } from '@workspace/components/genomics-matrix/tk-genomics-matrix.component';
import { TkGenomicsSpatialComponent } from '@workspace/components/genomics-spatial/tk-genomics-spatial.component';
import { TkGenomicsTracksComponent } from '@workspace/components/genomics-tracks/tk-genomics-tracks.component';

@NgModule({
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  declarations: [
    TkWorkspaceComponent,
    TkWidgetSpawnerComponent,
    TkWidgetRegionComponent,
    TkWidgetDragDirective,
    TkGenomicsInfoComponent,
    TkGenomicsMatrixComponent,
    TkGenomicsSpatialComponent,
    TkGenomicsTracksComponent
  ],
  exports: [],
  providers: [],
  entryComponents: [
    TkGenomicsInfoComponent,
    TkGenomicsMatrixComponent,
    TkGenomicsSpatialComponent,
    TkGenomicsTracksComponent
  ]
})
export class TkWorkspaceModule {}
