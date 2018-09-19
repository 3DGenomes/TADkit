import * as THREE from 'three-full';
import { AbstractObject3D } from '../abstract-object-3d';
export declare class GridHelperDirective extends AbstractObject3D<THREE.AxesHelper> {
    size: number;
    divisions: number;
    constructor();
    protected newObject3DInstance(): THREE.AxesHelper;
    protected afterInit(): void;
}
