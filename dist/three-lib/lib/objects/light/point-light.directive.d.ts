import * as THREE from 'three-full';
import { AbstractObject3D } from '../abstract-object-3d';
export declare class PointLightDirective extends AbstractObject3D<THREE.PointLight> {
    color: THREE.Color;
    intensity: number;
    distance: number;
    constructor();
    protected newObject3DInstance(): THREE.PointLight;
    protected afterInit(): void;
}
