/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenomicsInfoComponent } from './genomics-info/genomics-info.component';
import { GenomicsMatrixComponent } from './genomics-matrix/genomics-matrix.component';
import { GenomicsTracksComponent } from './genomics-tracks/genomics-tracks.component';
import { GenomicsSpatialComponent } from './genomics-spatial/genomics-spatial.component';
import { GenomicsThreejsComponent } from './genomics-threejs/genomics-threejs.component';
import { ThreeLibModule } from 'three-lib';
export class GenomicsLibModule {
}
GenomicsLibModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtbGliLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dlbm9taWNzLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9nZW5vbWljcy1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBMkIzQyxNQUFNOzs7WUF6QkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxjQUFjLENBQUM7Z0JBQ3ZDLFlBQVksRUFBRTtvQkFDWixxQkFBcUI7b0JBQ3JCLHVCQUF1QjtvQkFDdkIsdUJBQXVCO29CQUN2Qix3QkFBd0I7b0JBQ3hCLHdCQUF3QjtpQkFDekI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHFCQUFxQjtvQkFDckIsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtvQkFDeEIsd0JBQXdCO2lCQUN6QjtnQkFDRCxTQUFTLEVBQUUsRUFBRTtnQkFDYixlQUFlLEVBQUU7b0JBQ2YscUJBQXFCO29CQUNyQix1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtvQkFDeEIsdUJBQXVCO29CQUN2Qix3QkFBd0I7aUJBQ3pCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEdlbm9taWNzSW5mb0NvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtaW5mby9nZW5vbWljcy1pbmZvLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW5vbWljc01hdHJpeENvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtbWF0cml4L2dlbm9taWNzLW1hdHJpeC5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2Vub21pY3NUcmFja3NDb21wb25lbnQgfSBmcm9tICcuL2dlbm9taWNzLXRyYWNrcy9nZW5vbWljcy10cmFja3MuY29tcG9uZW50JztcbmltcG9ydCB7IEdlbm9taWNzU3BhdGlhbENvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3Mtc3BhdGlhbC9nZW5vbWljcy1zcGF0aWFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW5vbWljc1RocmVlanNDb21wb25lbnQgfSBmcm9tICcuL2dlbm9taWNzLXRocmVlanMvZ2Vub21pY3MtdGhyZWVqcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGhyZWVMaWJNb2R1bGUgfSBmcm9tICd0aHJlZS1saWInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBUaHJlZUxpYk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEdlbm9taWNzSW5mb0NvbXBvbmVudCxcbiAgICBHZW5vbWljc01hdHJpeENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCxcbiAgICBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQsXG4gICAgR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBHZW5vbWljc0luZm9Db21wb25lbnQsXG4gICAgR2Vub21pY3NNYXRyaXhDb21wb25lbnQsXG4gICAgR2Vub21pY3NUcmFja3NDb21wb25lbnQsXG4gICAgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50LFxuICAgIEdlbm9taWNzVGhyZWVqc0NvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBHZW5vbWljc0luZm9Db21wb25lbnQsXG4gICAgR2Vub21pY3NNYXRyaXhDb21wb25lbnQsXG4gICAgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50LFxuICAgIEdlbm9taWNzVHJhY2tzQ29tcG9uZW50LFxuICAgIEdlbm9taWNzVGhyZWVqc0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzTGliTW9kdWxlIHsgfVxuIl19