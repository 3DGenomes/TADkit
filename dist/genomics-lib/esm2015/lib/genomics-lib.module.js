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
                imports: [
                    CommonModule,
                    ThreeLibModule
                ],
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtbGliLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dlbm9taWNzLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9nZW5vbWljcy1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBOEIzQyxNQUFNOzs7WUE1QkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGNBQWM7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLHFCQUFxQjtvQkFDckIsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtvQkFDeEIsd0JBQXdCO2lCQUN6QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AscUJBQXFCO29CQUNyQix1QkFBdUI7b0JBQ3ZCLHVCQUF1QjtvQkFDdkIsd0JBQXdCO29CQUN4Qix3QkFBd0I7aUJBQ3pCO2dCQUNELFNBQVMsRUFBRSxFQUFFO2dCQUNiLGVBQWUsRUFBRTtvQkFDZixxQkFBcUI7b0JBQ3JCLHVCQUF1QjtvQkFDdkIsd0JBQXdCO29CQUN4Qix1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtpQkFDekI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgR2Vub21pY3NJbmZvQ29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy1pbmZvL2dlbm9taWNzLWluZm8uY29tcG9uZW50JztcbmltcG9ydCB7IEdlbm9taWNzTWF0cml4Q29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy1tYXRyaXgvZ2Vub21pY3MtbWF0cml4LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtdHJhY2tzL2dlbm9taWNzLXRyYWNrcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy1zcGF0aWFsL2dlbm9taWNzLXNwYXRpYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEdlbm9taWNzVGhyZWVqc0NvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtdGhyZWVqcy9nZW5vbWljcy10aHJlZWpzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaHJlZUxpYk1vZHVsZSB9IGZyb20gJ3RocmVlLWxpYic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVGhyZWVMaWJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgR2Vub21pY3NJbmZvQ29tcG9uZW50LFxuICAgIEdlbm9taWNzTWF0cml4Q29tcG9uZW50LFxuICAgIEdlbm9taWNzVHJhY2tzQ29tcG9uZW50LFxuICAgIEdlbm9taWNzU3BhdGlhbENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RocmVlanNDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEdlbm9taWNzSW5mb0NvbXBvbmVudCxcbiAgICBHZW5vbWljc01hdHJpeENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCxcbiAgICBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQsXG4gICAgR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIEdlbm9taWNzSW5mb0NvbXBvbmVudCxcbiAgICBHZW5vbWljc01hdHJpeENvbXBvbmVudCxcbiAgICBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQsXG4gICAgR2Vub21pY3NUcmFja3NDb21wb25lbnQsXG4gICAgR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NMaWJNb2R1bGUgeyB9XG4iXX0=