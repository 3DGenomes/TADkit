import { AbstractCamera } from './abstract-camera';
import * as THREE from 'three-full';
export declare class PerspectiveCameraDirective extends AbstractCamera<THREE.PerspectiveCamera> {
    fov: number;
    near: number;
    far: number;
    positionX: number;
    positionY: number;
    positionZ: number;
    constructor();
    protected afterInit(): void;
    updateAspectRatio(aspect: number): void;
}
