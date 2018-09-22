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
// TODO: Ideally move all to three-wrapper library. But can't move js/EnableThreeExamples.js to library :(
export class ThreeLibModule {
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtbGliLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RocmVlLWxpYi8iLCJzb3VyY2VzIjpbImxpYi90aHJlZS1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7QUF3Q3ZFLE1BQU07OztZQXJDTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixZQUFZLEVBQUU7b0JBQ1osc0JBQXNCO29CQUN0QixzQkFBc0I7b0JBQ3RCLGtCQUFrQjtvQkFDbEIsV0FBVztvQkFDWCxXQUFXO29CQUNYLDBCQUEwQjtvQkFDMUIsc0JBQXNCO29CQUN0QixjQUFjO29CQUNkLG1CQUFtQjtvQkFDbkIsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLG1CQUFtQjtvQkFDbkIsa0JBQWtCO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asc0JBQXNCO29CQUN0QixzQkFBc0I7b0JBQ3RCLGtCQUFrQjtvQkFDbEIsV0FBVztvQkFDWCxXQUFXO29CQUNYLDBCQUEwQjtvQkFDMUIsc0JBQXNCO29CQUN0QixjQUFjO29CQUNkLG1CQUFtQjtvQkFDbkIsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLG1CQUFtQjtvQkFDbkIsa0JBQWtCO2lCQUNuQjtnQkFDRCxTQUFTLEVBQUUsRUFBRTtnQkFDYixlQUFlLEVBQUU7b0JBQ2Ysc0JBQXNCO2lCQUN2QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9scy9vcmJpdC1jb250cm9scy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9sb2FkZXJzL2NvbGxhZGEtbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPYmpMb2FkZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbG9hZGVycy9vYmotbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSYWQyRGVnUGlwZSB9IGZyb20gJy4vcGlwZXMvcmFkMmRlZy5waXBlJztcbmltcG9ydCB7IERlZzJSYWRQaXBlIH0gZnJvbSAnLi9waXBlcy9kZWcycmFkLnBpcGUnO1xuaW1wb3J0IHsgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUgfSBmcm9tICcuL2NhbWVyYXMvcGVyc3BlY3RpdmUtY2FtZXJhLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9yZW5kZXJlci93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2NlbmVEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEF4ZXNIZWxwZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvaGVscGVycy9heGVzLWhlbHBlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR3JpZEhlbHBlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9oZWxwZXJzL2dyaWQtaGVscGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPYmplY3RMb2FkZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbG9hZGVycy9vYmplY3QtbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQb2ludExpZ2h0RGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2xpZ2h0L3BvaW50LWxpZ2h0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUaHJlZVRlc3RDb21wb25lbnQgfSBmcm9tICcuL3RocmVlLXRlc3QvdGhyZWUtdGVzdC5jb21wb25lbnQnO1xuXG4vLyBUT0RPOiBJZGVhbGx5IG1vdmUgYWxsIHRvIHRocmVlLXdyYXBwZXIgbGlicmFyeS4gQnV0IGNhbid0IG1vdmUganMvRW5hYmxlVGhyZWVFeGFtcGxlcy5qcyB0byBsaWJyYXJ5IDooXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgT3JiaXRDb250cm9sc0RpcmVjdGl2ZSxcbiAgICBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlLFxuICAgIE9iakxvYWRlckRpcmVjdGl2ZSxcbiAgICBSYWQyRGVnUGlwZSxcbiAgICBEZWcyUmFkUGlwZSxcbiAgICBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSxcbiAgICBXZWJHTFJlbmRlcmVyQ29tcG9uZW50LFxuICAgIFNjZW5lRGlyZWN0aXZlLFxuICAgIEF4ZXNIZWxwZXJEaXJlY3RpdmUsXG4gICAgR3JpZEhlbHBlckRpcmVjdGl2ZSxcbiAgICBPYmplY3RMb2FkZXJEaXJlY3RpdmUsXG4gICAgUG9pbnRMaWdodERpcmVjdGl2ZSxcbiAgICBUaHJlZVRlc3RDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE9yYml0Q29udHJvbHNEaXJlY3RpdmUsXG4gICAgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSxcbiAgICBPYmpMb2FkZXJEaXJlY3RpdmUsXG4gICAgUmFkMkRlZ1BpcGUsXG4gICAgRGVnMlJhZFBpcGUsXG4gICAgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUsXG4gICAgV2ViR0xSZW5kZXJlckNvbXBvbmVudCxcbiAgICBTY2VuZURpcmVjdGl2ZSxcbiAgICBBeGVzSGVscGVyRGlyZWN0aXZlLFxuICAgIEdyaWRIZWxwZXJEaXJlY3RpdmUsXG4gICAgT2JqZWN0TG9hZGVyRGlyZWN0aXZlLFxuICAgIFBvaW50TGlnaHREaXJlY3RpdmUsXG4gICAgVGhyZWVUZXN0Q29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIFdlYkdMUmVuZGVyZXJDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUaHJlZUxpYk1vZHVsZSB7IH1cbiJdfQ==