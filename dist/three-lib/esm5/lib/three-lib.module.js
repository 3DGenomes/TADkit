/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrbitControlsDirective } from './controls/orbit-controls.directive';
import { ColladaLoaderDirective } from './objects/loaders/collada-loader.directive';
import { ObjLoaderDirective } from './objects/loaders/obj-loader.directive';
import { Rad2DegPipe } from './pipes/rad2deg.pipe';
import { Deg2RadPipe } from './pipes/deg2rad.pipe';
import { PerspectiveCameraDirective } from './cameras/perspective-camera.directive';
import { WebGLRendererComponent } from './renderer/webgl-renderer.component';
import { SceneDirective } from './objects/scene.directive';
import { AxesHelperDirective } from './objects/helpers/axes-helper.directive';
import { GridHelperDirective } from './objects/helpers/grid-helper.directive';
import { ObjectLoaderDirective } from './objects/loaders/object-loader.directive';
import { PointLightDirective } from './objects/light/point-light.directive';
import { ThreeTestComponent } from './three-test/three-test.component';
var ThreeLibModule = /** @class */ (function () {
    function ThreeLibModule() {
    }
    ThreeLibModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [
                        OrbitControlsDirective,
                        ColladaLoaderDirective,
                        ObjLoaderDirective,
                        Rad2DegPipe,
                        Deg2RadPipe,
                        PerspectiveCameraDirective,
                        WebGLRendererComponent,
                        SceneDirective,
                        AxesHelperDirective,
                        GridHelperDirective,
                        ObjectLoaderDirective,
                        PointLightDirective,
                        ThreeTestComponent
                    ],
                    exports: [
                        OrbitControlsDirective,
                        ColladaLoaderDirective,
                        ObjLoaderDirective,
                        Rad2DegPipe,
                        Deg2RadPipe,
                        PerspectiveCameraDirective,
                        WebGLRendererComponent,
                        SceneDirective,
                        AxesHelperDirective,
                        GridHelperDirective,
                        ObjectLoaderDirective,
                        PointLightDirective,
                        ThreeTestComponent
                    ],
                    providers: [],
                    entryComponents: [
                        WebGLRendererComponent
                    ]
                },] },
    ];
    return ThreeLibModule;
}());
export { ThreeLibModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtbGliLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RocmVlLWxpYi8iLCJzb3VyY2VzIjpbImxpYi90aHJlZS1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7Z0JBR3RFLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksRUFBRTt3QkFDWixzQkFBc0I7d0JBQ3RCLHNCQUFzQjt3QkFDdEIsa0JBQWtCO3dCQUNsQixXQUFXO3dCQUNYLFdBQVc7d0JBQ1gsMEJBQTBCO3dCQUMxQixzQkFBc0I7d0JBQ3RCLGNBQWM7d0JBQ2QsbUJBQW1CO3dCQUNuQixtQkFBbUI7d0JBQ25CLHFCQUFxQjt3QkFDckIsbUJBQW1CO3dCQUNuQixrQkFBa0I7cUJBQ25CO29CQUNELE9BQU8sRUFBRTt3QkFDUCxzQkFBc0I7d0JBQ3RCLHNCQUFzQjt3QkFDdEIsa0JBQWtCO3dCQUNsQixXQUFXO3dCQUNYLFdBQVc7d0JBQ1gsMEJBQTBCO3dCQUMxQixzQkFBc0I7d0JBQ3RCLGNBQWM7d0JBQ2QsbUJBQW1CO3dCQUNuQixtQkFBbUI7d0JBQ25CLHFCQUFxQjt3QkFDckIsbUJBQW1CO3dCQUNuQixrQkFBa0I7cUJBQ25CO29CQUNELFNBQVMsRUFBRSxFQUFFO29CQUNiLGVBQWUsRUFBRTt3QkFDZixzQkFBc0I7cUJBQ3ZCO2lCQUNGOzt5QkFyREQ7O1NBc0RhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHNEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2xzL29yYml0LWNvbnRyb2xzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2xvYWRlcnMvY29sbGFkYS1sb2FkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9iakxvYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9sb2FkZXJzL29iai1sb2FkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJhZDJEZWdQaXBlIH0gZnJvbSAnLi9waXBlcy9yYWQyZGVnLnBpcGUnO1xuaW1wb3J0IHsgRGVnMlJhZFBpcGUgfSBmcm9tICcuL3BpcGVzL2RlZzJyYWQucGlwZSc7XG5pbXBvcnQgeyBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSB9IGZyb20gJy4vY2FtZXJhcy9wZXJzcGVjdGl2ZS1jYW1lcmEuZGlyZWN0aXZlJztcbmltcG9ydCB7IFdlYkdMUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY2VuZURpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9zY2VuZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQXhlc0hlbHBlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9oZWxwZXJzL2F4ZXMtaGVscGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHcmlkSGVscGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2hlbHBlcnMvZ3JpZC1oZWxwZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9iamVjdExvYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9sb2FkZXJzL29iamVjdC1sb2FkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IFBvaW50TGlnaHREaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbGlnaHQvcG9pbnQtbGlnaHQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRocmVlVGVzdENvbXBvbmVudCB9IGZyb20gJy4vdGhyZWUtdGVzdC90aHJlZS10ZXN0LmNvbXBvbmVudCc7XG5cbi8vIFRPRE86IElkZWFsbHkgbW92ZSBhbGwgdG8gdGhyZWUtd3JhcHBlciBsaWJyYXJ5LiBCdXQgY2FuJ3QgbW92ZSBqcy9FbmFibGVUaHJlZUV4YW1wbGVzLmpzIHRvIGxpYnJhcnkgOihcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBPcmJpdENvbnRyb2xzRGlyZWN0aXZlLFxuICAgIENvbGxhZGFMb2FkZXJEaXJlY3RpdmUsXG4gICAgT2JqTG9hZGVyRGlyZWN0aXZlLFxuICAgIFJhZDJEZWdQaXBlLFxuICAgIERlZzJSYWRQaXBlLFxuICAgIFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLFxuICAgIFdlYkdMUmVuZGVyZXJDb21wb25lbnQsXG4gICAgU2NlbmVEaXJlY3RpdmUsXG4gICAgQXhlc0hlbHBlckRpcmVjdGl2ZSxcbiAgICBHcmlkSGVscGVyRGlyZWN0aXZlLFxuICAgIE9iamVjdExvYWRlckRpcmVjdGl2ZSxcbiAgICBQb2ludExpZ2h0RGlyZWN0aXZlLFxuICAgIFRocmVlVGVzdENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgT3JiaXRDb250cm9sc0RpcmVjdGl2ZSxcbiAgICBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlLFxuICAgIE9iakxvYWRlckRpcmVjdGl2ZSxcbiAgICBSYWQyRGVnUGlwZSxcbiAgICBEZWcyUmFkUGlwZSxcbiAgICBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSxcbiAgICBXZWJHTFJlbmRlcmVyQ29tcG9uZW50LFxuICAgIFNjZW5lRGlyZWN0aXZlLFxuICAgIEF4ZXNIZWxwZXJEaXJlY3RpdmUsXG4gICAgR3JpZEhlbHBlckRpcmVjdGl2ZSxcbiAgICBPYmplY3RMb2FkZXJEaXJlY3RpdmUsXG4gICAgUG9pbnRMaWdodERpcmVjdGl2ZSxcbiAgICBUaHJlZVRlc3RDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgV2ViR0xSZW5kZXJlckNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRocmVlTGliTW9kdWxlIHsgfVxuIl19