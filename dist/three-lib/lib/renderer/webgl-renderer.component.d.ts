import { ElementRef, QueryList, AfterViewInit } from '@angular/core';
import * as THREE from 'three-full';
import { SceneDirective } from '../objects/scene.directive';
import { AbstractCamera } from '../cameras/abstract-camera';
export declare class WebGLRendererComponent implements AfterViewInit {
    private renderer;
    private viewInitialized;
    private canvasRef;
    sceneComponents: QueryList<SceneDirective>;
    cameraComponents: QueryList<AbstractCamera<THREE.Camera>>;
    constructor();
    ngAfterViewInit(): void;
    /**
     * The render pane on which the scene is rendered.
     * Currently, only the WebGL renderer with a canvas is used in this
     * implementation, so this property will always be an ElementRef to the
     * underlying <canvas> element.
     *
     * @example This property can be used to restrict the orbit controls (i.e. the
     * area which is listened for mouse move and zoom events) to the rendering pane:
     * ```
     * <three-orbit-controls [rotateSpeed]=1 [zoomSpeed]=1.2 [listeningControlElement]=mainRenderer.renderPane>
     *   <three-renderer #mainRenderer>
     *     ...
     *   </three-renderer>
     * </three-orbit-controls>
     * ```
     */
    readonly renderPane: ElementRef;
    private readonly canvas;
    private startRendering;
    render(): void;
    private calculateAspectRatio;
    onResize(event: Event): void;
    updateChildCamerasAspectRatio(): void;
}
