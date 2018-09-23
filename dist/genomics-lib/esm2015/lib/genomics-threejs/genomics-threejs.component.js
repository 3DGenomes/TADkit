/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class GenomicsThreejsComponent {
    constructor() {
        this.x = 20;
        this.z = 20;
        this.rotationX = 1;
        this.rotationY = 2;
        this.rotationZ = 3;
        this.translationY = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.dataStream.subscribe(strm => this.data = strm);
        // console.log('ThreeWidgets: ', ThreeWidgets);
    }
}
GenomicsThreejsComponent.decorators = [
    { type: Component, args: [{
                selector: 'genomics-threejs',
                template: "<three-test></three-test>\n<!-- <three-orbit-controls [rotateSpeed]=1 [zoomSpeed]=1.2 [listeningControlElement]=mainRenderer.renderPane>\n  <three-webgl-renderer #mainRenderer>\n    <three-perspective-camera [fov]=60 [near]=1 [far]=1100 positionX=20 positionY=50 positionZ=50></three-perspective-camera>\n    <three-scene>\n      <three-axes-helper size=200></three-axes-helper>\n      <three-grid-helper size=100 divisions=10></three-grid-helper>\n      <three-point-light color=\"white\" intensity=\"1\" distance=\"1000\" translateX=50 translateY=50 translateZ=50></three-point-light>\n      <three-object-loader\n        model=\"assets/examples/threejs-test.json\"\n        [translateX]=\"x\"\n        [translateZ]=\"z\"\n        [renderer]=\"mainRenderer\"\n        [rotateX]=\"rotationX\"\n        [rotateY]=\"rotationY\"\n        [rotateZ]=\"rotationZ\"\n        [translateY]=\"translationY\"\n      >\n      </three-object-loader>\n    </three-scene>\n  </three-webgl-renderer>\n</three-orbit-controls> -->\n",
                styles: [""]
            }] }
];
GenomicsThreejsComponent.ctorParameters = () => [];
GenomicsThreejsComponent.propDecorators = {
    dataStream: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    GenomicsThreejsComponent.prototype.dataStream;
    /** @type {?} */
    GenomicsThreejsComponent.prototype.data;
    /** @type {?} */
    GenomicsThreejsComponent.prototype.x;
    /** @type {?} */
    GenomicsThreejsComponent.prototype.z;
    /** @type {?} */
    GenomicsThreejsComponent.prototype.rotationX;
    /** @type {?} */
    GenomicsThreejsComponent.prototype.rotationY;
    /** @type {?} */
    GenomicsThreejsComponent.prototype.rotationZ;
    /** @type {?} */
    GenomicsThreejsComponent.prototype.translationY;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtdGhyZWVqcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nZW5vbWljcy1saWIvIiwic291cmNlcyI6WyJsaWIvZ2Vub21pY3MtdGhyZWVqcy9nZW5vbWljcy10aHJlZWpzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFRekQsTUFBTTtJQVVKO1FBUE8sTUFBQyxHQUFHLEVBQUUsQ0FBQztRQUNQLE1BQUMsR0FBRyxFQUFFLENBQUM7UUFDUCxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxpQkFBWSxHQUFHLENBQUMsQ0FBQztJQUVSLENBQUM7Ozs7SUFFVixRQUFRO1FBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3BELCtDQUErQztJQUNqRCxDQUFDOzs7WUFwQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLG1nQ0FBZ0Q7O2FBRWpEOzs7O3lCQUVFLEtBQUs7Ozs7SUFBTiw4Q0FBeUI7O0lBQ3pCLHdDQUFpQjs7SUFDakIscUNBQWM7O0lBQ2QscUNBQWM7O0lBQ2QsNkNBQXFCOztJQUNyQiw2Q0FBcUI7O0lBQ3JCLDZDQUFxQjs7SUFDckIsZ0RBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUaHJlZVdpZGdldHMgZnJvbSAndGhyZWUtbGliJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2Vub21pY3MtdGhyZWVqcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9nZW5vbWljcy10aHJlZWpzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ2Vub21pY3MtdGhyZWVqcy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuICBwdWJsaWMgZGF0YTogYW55O1xuICBwdWJsaWMgeCA9IDIwO1xuICBwdWJsaWMgeiA9IDIwO1xuICBwdWJsaWMgcm90YXRpb25YID0gMTtcbiAgcHVibGljIHJvdGF0aW9uWSA9IDI7XG4gIHB1YmxpYyByb3RhdGlvblogPSAzO1xuICBwdWJsaWMgdHJhbnNsYXRpb25ZID0gMDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTdHJlYW0uc3Vic2NyaWJlKHN0cm0gPT4gdGhpcy5kYXRhID0gc3RybSk7XG4gICAgLy8gY29uc29sZS5sb2coJ1RocmVlV2lkZ2V0czogJywgVGhyZWVXaWRnZXRzKTtcbiAgfVxufVxuIl19