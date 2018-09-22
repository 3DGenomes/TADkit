import { AfterViewInit, ElementRef } from '@angular/core';
export declare class ThreeTestComponent implements AfterViewInit {
    canvasRef: ElementRef;
    renderer: any;
    scene: any;
    camera: any;
    controls: any;
    mesh: any;
    light: any;
    private readonly canvas;
    private calculateAspectRatio;
    constructor();
    ngAfterViewInit(): void;
    configScene(): void;
    configCamera(): void;
    configRenderer(): void;
    configControls(): void;
    createLight(): void;
    createMesh(): void;
    animate(): void;
}
