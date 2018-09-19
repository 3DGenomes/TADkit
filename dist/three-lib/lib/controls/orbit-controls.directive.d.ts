import { AfterViewInit, ElementRef, OnChanges, OnDestroy, SimpleChanges, QueryList } from '@angular/core';
import * as THREE from 'three-full';
import { WebGLRendererComponent } from '../renderer/webgl-renderer.component';
import { AbstractCamera } from '../cameras/abstract-camera';
export declare class OrbitControlsDirective implements AfterViewInit, OnChanges, OnDestroy {
    childCameras: QueryList<AbstractCamera<THREE.Camera>>;
    childRenderers: QueryList<WebGLRendererComponent>;
    /**
     * The element on whose native element the orbit controls will listen for mouse events.
     *
     * Note that keyboard events are still listened for on the global window object, this is
     * a known issue from Three.js: https://github.com/mrdoob/three.js/pull/10315
     *
     * @example This property can be used to restrict the orbit controls (i.e. the
     * area which is listened for mouse move and zoom events) to the rendering pane:
     * ```
     * <three-orbit-controls [listeningControlElement]=mainRenderer.renderPane>
     *   <three-renderer #mainRenderer>
     *     ...
     *   </three-renderer>
     * </three-orbit-controls>
     * ```
     */
    listeningControlElement: ElementRef | undefined;
    rotateSpeed: number;
    zoomSpeed: number;
    private controls;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private setUpOrbitControls;
    ngAfterViewInit(): void;
}
