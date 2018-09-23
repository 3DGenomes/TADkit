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
                },] }
    ];
    return GenomicsLibModule;
}());
export { GenomicsLibModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtbGliLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dlbm9taWNzLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9nZW5vbWljcy1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTNDO0lBQUE7SUF5QmlDLENBQUM7O2dCQXpCakMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxjQUFjLENBQUM7b0JBQ3ZDLFlBQVksRUFBRTt3QkFDWixxQkFBcUI7d0JBQ3JCLHVCQUF1Qjt3QkFDdkIsdUJBQXVCO3dCQUN2Qix3QkFBd0I7d0JBQ3hCLHdCQUF3QjtxQkFDekI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHFCQUFxQjt3QkFDckIsdUJBQXVCO3dCQUN2Qix1QkFBdUI7d0JBQ3ZCLHdCQUF3Qjt3QkFDeEIsd0JBQXdCO3FCQUN6QjtvQkFDRCxTQUFTLEVBQUUsRUFBRTtvQkFDYixlQUFlLEVBQUU7d0JBQ2YscUJBQXFCO3dCQUNyQix1QkFBdUI7d0JBQ3ZCLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2Qix3QkFBd0I7cUJBQ3pCO2lCQUNGOztJQUNnQyx3QkFBQztDQUFBLEFBekJsQyxJQXlCa0M7U0FBckIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBHZW5vbWljc0luZm9Db21wb25lbnQgfSBmcm9tICcuL2dlbm9taWNzLWluZm8vZ2Vub21pY3MtaW5mby5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2Vub21pY3NNYXRyaXhDb21wb25lbnQgfSBmcm9tICcuL2dlbm9taWNzLW1hdHJpeC9nZW5vbWljcy1tYXRyaXguY29tcG9uZW50JztcbmltcG9ydCB7IEdlbm9taWNzVHJhY2tzQ29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy10cmFja3MvZ2Vub21pY3MtdHJhY2tzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQgfSBmcm9tICcuL2dlbm9taWNzLXNwYXRpYWwvZ2Vub21pY3Mtc3BhdGlhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy10aHJlZWpzL2dlbm9taWNzLXRocmVlanMuY29tcG9uZW50JztcbmltcG9ydCB7IFRocmVlTGliTW9kdWxlIH0gZnJvbSAndGhyZWUtbGliJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgVGhyZWVMaWJNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBHZW5vbWljc0luZm9Db21wb25lbnQsXG4gICAgR2Vub21pY3NNYXRyaXhDb21wb25lbnQsXG4gICAgR2Vub21pY3NUcmFja3NDb21wb25lbnQsXG4gICAgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50LFxuICAgIEdlbm9taWNzVGhyZWVqc0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgR2Vub21pY3NJbmZvQ29tcG9uZW50LFxuICAgIEdlbm9taWNzTWF0cml4Q29tcG9uZW50LFxuICAgIEdlbm9taWNzVHJhY2tzQ29tcG9uZW50LFxuICAgIEdlbm9taWNzU3BhdGlhbENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RocmVlanNDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgR2Vub21pY3NJbmZvQ29tcG9uZW50LFxuICAgIEdlbm9taWNzTWF0cml4Q29tcG9uZW50LFxuICAgIEdlbm9taWNzU3BhdGlhbENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCxcbiAgICBHZW5vbWljc1RocmVlanNDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc0xpYk1vZHVsZSB7IH1cbiJdfQ==