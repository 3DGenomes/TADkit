import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenomicsInfoComponent } from './genomics-info/genomics-info.component';
import { GenomicsMatrixComponent } from './genomics-matrix/genomics-matrix.component';
import { GenomicsTracksComponent } from './genomics-tracks/genomics-tracks.component';
import { GenomicsSpatialComponent } from './genomics-spatial/genomics-spatial.component';
import { GenomicsThreejsComponent } from './genomics-threejs/genomics-threejs.component';
import { ThreeLibModule } from 'three-lib';

@NgModule({
  imports: [CommonModule, ThreeLibModule],
  declarations: [
    GenomicsInfoComponent,
    GenomicsMatrixComponent,
    GenomicsTracksComponent,
    GenomicsSpatialComponent,
    GenomicsThreejsComponent
  ],
  exports: [
    GenomicsInfoComponent,
    GenomicsMatrixComponent,
    GenomicsTracksComponent,
    GenomicsSpatialComponent,
    GenomicsThreejsComponent
  ],
  providers: [],
  entryComponents: [
    GenomicsInfoComponent,
    GenomicsMatrixComponent,
    GenomicsSpatialComponent,
    GenomicsTracksComponent,
    GenomicsThreejsComponent
  ]
})
export class GenomicsLibModule { }
