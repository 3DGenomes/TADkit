import { AfterViewInit, OnChanges, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three-full';
export declare abstract class AbstractObject3D<T extends THREE.Object3D> implements AfterViewInit, OnChanges {
    childNodes: QueryList<AbstractObject3D<THREE.Object3D>>;
    /**
     * Rotation in Euler angles (radians) with order X, Y, Z.
     */
    rotateX: number;
    /**
     * Rotation in Euler angles (radians) with order X, Y, Z.
     */
    rotateY: number;
    /**
     * Rotation in Euler angles (radians) with order X, Y, Z.
     */
    rotateZ: number;
    translateX: number;
    translateY: number;
    translateZ: number;
    private object;
    protected rerender(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    private applyRotation;
    private applyTranslation;
    protected addChild(object: THREE.Object3D): void;
    protected removeChild(object: THREE.Object3D): void;
    getObject(): T;
    protected abstract newObject3DInstance(): T;
    protected abstract afterInit(): void;
}
