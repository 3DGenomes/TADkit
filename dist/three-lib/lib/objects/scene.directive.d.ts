import * as THREE from 'three-full';
import { AbstractObject3D } from './abstract-object-3d';
export declare class SceneDirective extends AbstractObject3D<THREE.Scene> {
    constructor();
    protected afterInit(): void;
    protected newObject3DInstance(): THREE.Scene;
}
