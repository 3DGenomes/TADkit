import { AfterViewInit, ElementRef } from '@angular/core';
export declare class ThreeTestComponent implements AfterViewInit {
    private elem;
    canvasRef: ElementRef;
    scene: any;
    camera: any;
    renderer: any;
    controls: any;
    mesh: any;
    light: any;
    count: number;
    onResize(event: any): void;
    private readonly canvas;
    constructor(elem: ElementRef);
    ngAfterViewInit(): void;
    configScene(): void;
    private calculateAspectRatio;
    updateCamera(): void;
    configCamera(): void;
    resizeCanvasToDisplaySize(force: any): void;
    configRenderer(): void;
    configControls(): void;
    createLight(): void;
    createMesh(): void;
    animate(): void;
}
