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
var GenomicsLibModule = /** @class */ (function () {
    function GenomicsLibModule() {
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
    return GenomicsLibModule;
}());
export { GenomicsLibModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtbGliLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dlbm9taWNzLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9nZW5vbWljcy1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTNDO0lBQUE7SUE0QmlDLENBQUM7O2dCQTVCakMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGNBQWM7cUJBQ2Y7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHFCQUFxQjt3QkFDckIsdUJBQXVCO3dCQUN2Qix1QkFBdUI7d0JBQ3ZCLHdCQUF3Qjt3QkFDeEIsd0JBQXdCO3FCQUN6QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AscUJBQXFCO3dCQUNyQix1QkFBdUI7d0JBQ3ZCLHVCQUF1Qjt3QkFDdkIsd0JBQXdCO3dCQUN4Qix3QkFBd0I7cUJBQ3pCO29CQUNELFNBQVMsRUFBRSxFQUFFO29CQUNiLGVBQWUsRUFBRTt3QkFDZixxQkFBcUI7d0JBQ3JCLHVCQUF1Qjt3QkFDdkIsd0JBQXdCO3dCQUN4Qix1QkFBdUI7d0JBQ3ZCLHdCQUF3QjtxQkFDekI7aUJBQ0Y7O0lBQ2dDLHdCQUFDO0NBQUEsQUE1QmxDLElBNEJrQztTQUFyQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEdlbm9taWNzSW5mb0NvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtaW5mby9nZW5vbWljcy1pbmZvLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW5vbWljc01hdHJpeENvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtbWF0cml4L2dlbm9taWNzLW1hdHJpeC5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2Vub21pY3NUcmFja3NDb21wb25lbnQgfSBmcm9tICcuL2dlbm9taWNzLXRyYWNrcy9nZW5vbWljcy10cmFja3MuY29tcG9uZW50JztcbmltcG9ydCB7IEdlbm9taWNzU3BhdGlhbENvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3Mtc3BhdGlhbC9nZW5vbWljcy1zcGF0aWFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW5vbWljc1RocmVlanNDb21wb25lbnQgfSBmcm9tICcuL2dlbm9taWNzLXRocmVlanMvZ2Vub21pY3MtdGhyZWVqcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGhyZWVMaWJNb2R1bGUgfSBmcm9tICd0aHJlZS1saWInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFRocmVlTGliTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEdlbm9taWNzSW5mb0NvbXBvbmVudCxcbiAgICBHZW5vbWljc01hdHJpeENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCxcbiAgICBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQsXG4gICAgR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBHZW5vbWljc0luZm9Db21wb25lbnQsXG4gICAgR2Vub21pY3NNYXRyaXhDb21wb25lbnQsXG4gICAgR2Vub21pY3NUcmFja3NDb21wb25lbnQsXG4gICAgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50LFxuICAgIEdlbm9taWNzVGhyZWVqc0NvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBHZW5vbWljc0luZm9Db21wb25lbnQsXG4gICAgR2Vub21pY3NNYXRyaXhDb21wb25lbnQsXG4gICAgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50LFxuICAgIEdlbm9taWNzVHJhY2tzQ29tcG9uZW50LFxuICAgIEdlbm9taWNzVGhyZWVqc0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzTGliTW9kdWxlIHsgfVxuIl19