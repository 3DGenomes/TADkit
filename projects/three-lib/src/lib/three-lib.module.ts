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
@NgModule({
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
})
export class ThreeLibModule { }
