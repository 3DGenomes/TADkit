import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenomicsInfoComponent } from './genomics-info/genomics-info.component';
import { GenomicsMatrixComponent } from './genomics-matrix/genomics-matrix.component';
import { GenomicsTracksComponent } from './genomics-tracks/genomics-tracks.component';
import { GenomicsSpatialComponent } from './genomics-spatial/genomics-spatial.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    GenomicsInfoComponent,
    GenomicsMatrixComponent,
    GenomicsTracksComponent,
    GenomicsSpatialComponent
  ],
  exports: [
    GenomicsInfoComponent,
    GenomicsMatrixComponent,
    GenomicsTracksComponent,
    GenomicsSpatialComponent
  ],
  providers: [],
  entryComponents: [
    GenomicsInfoComponent,
    GenomicsMatrixComponent,
    GenomicsSpatialComponent,
    GenomicsTracksComponent
  ]
})
export class GenomicsLibModule { }
