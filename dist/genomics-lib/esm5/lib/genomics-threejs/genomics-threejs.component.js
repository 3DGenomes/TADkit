/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as ThreeWidgets from 'three-lib';
var GenomicsThreejsComponent = /** @class */ (function () {
    function GenomicsThreejsComponent() {
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
    GenomicsThreejsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dataStream.subscribe(function (strm) { return _this.data = strm; });
        console.log('ThreeWidgets: ', ThreeWidgets);
    };
    GenomicsThreejsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'genomics-threejs',
                    template: "<three-test></three-test>\n<!-- <three-orbit-controls [rotateSpeed]=1 [zoomSpeed]=1.2 [listeningControlElement]=mainRenderer.renderPane>\n  <three-webgl-renderer #mainRenderer>\n    <three-perspective-camera [fov]=60 [near]=1 [far]=1100 positionX=20 positionY=50 positionZ=50></three-perspective-camera>\n    <three-scene>\n      <three-axes-helper size=200></three-axes-helper>\n      <three-grid-helper size=100 divisions=10></three-grid-helper>\n      <three-point-light color=\"white\" intensity=\"1\" distance=\"1000\" translateX=50 translateY=50 translateZ=50></three-point-light>\n      <three-object-loader\n        model=\"assets/examples/threejs-test.json\"\n        [translateX]=\"x\"\n        [translateZ]=\"z\"\n        [renderer]=\"mainRenderer\"\n        [rotateX]=\"rotationX\"\n        [rotateY]=\"rotationY\"\n        [rotateZ]=\"rotationZ\"\n        [translateY]=\"translationY\"\n      >\n      </three-object-loader>\n    </three-scene>\n  </three-webgl-renderer>\n</three-orbit-controls> -->\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    GenomicsThreejsComponent.ctorParameters = function () { return []; };
    GenomicsThreejsComponent.propDecorators = {
        dataStream: [{ type: Input }]
    };
    return GenomicsThreejsComponent;
}());
export { GenomicsThreejsComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtdGhyZWVqcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nZW5vbWljcy1saWIvIiwic291cmNlcyI6WyJsaWIvZ2Vub21pY3MtdGhyZWVqcy9nZW5vbWljcy10aHJlZWpzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxLQUFLLFlBQVksTUFBTSxXQUFXLENBQUM7O0lBdUN4QztpQkFQVyxFQUFFO2lCQUNGLEVBQUU7eUJBQ00sQ0FBQzt5QkFDRCxDQUFDO3lCQUNELENBQUM7NEJBQ0UsQ0FBQztLQUVOOzs7O0lBRVYsMkNBQVE7Ozs7O1FBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLENBQUM7OztnQkF6Qy9DLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUseS9CQXNCWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2I7Ozs7OzZCQUVFLEtBQUs7O21DQS9CUjs7U0E4QmEsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUaHJlZVdpZGdldHMgZnJvbSAndGhyZWUtbGliJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2Vub21pY3MtdGhyZWVqcycsXG4gIHRlbXBsYXRlOiBgPHRocmVlLXRlc3Q+PC90aHJlZS10ZXN0PlxuPCEtLSA8dGhyZWUtb3JiaXQtY29udHJvbHMgW3JvdGF0ZVNwZWVkXT0xIFt6b29tU3BlZWRdPTEuMiBbbGlzdGVuaW5nQ29udHJvbEVsZW1lbnRdPW1haW5SZW5kZXJlci5yZW5kZXJQYW5lPlxuICA8dGhyZWUtd2ViZ2wtcmVuZGVyZXIgI21haW5SZW5kZXJlcj5cbiAgICA8dGhyZWUtcGVyc3BlY3RpdmUtY2FtZXJhIFtmb3ZdPTYwIFtuZWFyXT0xIFtmYXJdPTExMDAgcG9zaXRpb25YPTIwIHBvc2l0aW9uWT01MCBwb3NpdGlvblo9NTA+PC90aHJlZS1wZXJzcGVjdGl2ZS1jYW1lcmE+XG4gICAgPHRocmVlLXNjZW5lPlxuICAgICAgPHRocmVlLWF4ZXMtaGVscGVyIHNpemU9MjAwPjwvdGhyZWUtYXhlcy1oZWxwZXI+XG4gICAgICA8dGhyZWUtZ3JpZC1oZWxwZXIgc2l6ZT0xMDAgZGl2aXNpb25zPTEwPjwvdGhyZWUtZ3JpZC1oZWxwZXI+XG4gICAgICA8dGhyZWUtcG9pbnQtbGlnaHQgY29sb3I9XCJ3aGl0ZVwiIGludGVuc2l0eT1cIjFcIiBkaXN0YW5jZT1cIjEwMDBcIiB0cmFuc2xhdGVYPTUwIHRyYW5zbGF0ZVk9NTAgdHJhbnNsYXRlWj01MD48L3RocmVlLXBvaW50LWxpZ2h0PlxuICAgICAgPHRocmVlLW9iamVjdC1sb2FkZXJcbiAgICAgICAgbW9kZWw9XCJhc3NldHMvZXhhbXBsZXMvdGhyZWVqcy10ZXN0Lmpzb25cIlxuICAgICAgICBbdHJhbnNsYXRlWF09XCJ4XCJcbiAgICAgICAgW3RyYW5zbGF0ZVpdPVwielwiXG4gICAgICAgIFtyZW5kZXJlcl09XCJtYWluUmVuZGVyZXJcIlxuICAgICAgICBbcm90YXRlWF09XCJyb3RhdGlvblhcIlxuICAgICAgICBbcm90YXRlWV09XCJyb3RhdGlvbllcIlxuICAgICAgICBbcm90YXRlWl09XCJyb3RhdGlvblpcIlxuICAgICAgICBbdHJhbnNsYXRlWV09XCJ0cmFuc2xhdGlvbllcIlxuICAgICAgPlxuICAgICAgPC90aHJlZS1vYmplY3QtbG9hZGVyPlxuICAgIDwvdGhyZWUtc2NlbmU+XG4gIDwvdGhyZWUtd2ViZ2wtcmVuZGVyZXI+XG48L3RocmVlLW9yYml0LWNvbnRyb2xzPiAtLT5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc1RocmVlanNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG4gIHB1YmxpYyB4ID0gMjA7XG4gIHB1YmxpYyB6ID0gMjA7XG4gIHB1YmxpYyByb3RhdGlvblggPSAxO1xuICBwdWJsaWMgcm90YXRpb25ZID0gMjtcbiAgcHVibGljIHJvdGF0aW9uWiA9IDM7XG4gIHB1YmxpYyB0cmFuc2xhdGlvblkgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgICBjb25zb2xlLmxvZygnVGhyZWVXaWRnZXRzOiAnLCBUaHJlZVdpZGdldHMpO1xuICB9XG59XG4iXX0=