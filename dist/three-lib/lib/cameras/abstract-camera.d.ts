import { AfterViewInit } from '@angular/core';
import * as THREE from 'three-full';
export declare abstract class AbstractCamera<T extends THREE.Camera> implements AfterViewInit {
    camera: T;
    constructor();
    ngAfterViewInit(): void;
    protected abstract afterInit(): void;
    abstract updateAspectRatio(aspect: number): any;
}
