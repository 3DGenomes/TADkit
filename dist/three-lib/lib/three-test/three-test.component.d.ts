import { AfterViewInit, ElementRef } from '@angular/core';
export declare class ThreeTestComponent implements AfterViewInit {
    canvasRef: ElementRef;
    renderer: any;
    scene: any;
    camera: any;
    mesh: any;
    controls: any;
    constructor();
    private readonly canvas;
    ngAfterViewInit(): void;
    configCamera(): void;
    configRenderer(): void;
    configControls(): void;
    createMesh(): void;
    animate(): void;
}
