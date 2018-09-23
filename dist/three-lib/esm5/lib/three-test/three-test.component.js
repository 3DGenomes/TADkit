/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
// import { CameraControls } from 'camera-controls';
var ThreeTestComponent = /** @class */ (function () {
    function ThreeTestComponent(elem) {
        this.elem = elem;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.mesh = null;
        this.light = null;
        this.count = 1;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ThreeTestComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.resizeCanvasToDisplaySize(true);
    };
    Object.defineProperty(ThreeTestComponent.prototype, "canvas", {
        get: /**
         * @return {?}
         */
        function () {
            return this.canvasRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.configScene();
        this.configCamera();
        this.configRenderer();
        this.configControls();
        this.createLight();
        this.createMesh();
        this.animate();
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.configScene = /**
     * @return {?}
     */
    function () {
        this.scene.background = new THREE.Color(0xdddddd);
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.calculateAspectRatio = /**
     * @return {?}
     */
    function () {
        // console.log('canvas.clientWidth: ', this.canvas.clientWidth);
        //    console.log('canvas.clientHeight: ', this.canvas.clientHeight);
        /** @type {?} */
        var height = this.canvas.clientHeight;
        if (height === 0) {
            return 0;
        }
        return this.canvas.clientWidth / this.canvas.clientHeight;
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.updateCamera = /**
     * @return {?}
     */
    function () {
        this.camera.aspect = this.calculateAspectRatio();
        this.camera.updateProjectionMatrix();
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.configCamera = /**
     * @return {?}
     */
    function () {
        this.updateCamera();
        this.camera.position.set(-15, 10, 15);
        this.camera.lookAt(this.scene.position);
    };
    /**
     * @param {?} force
     * @return {?}
     */
    ThreeTestComponent.prototype.resizeCanvasToDisplaySize = /**
     * @param {?} force
     * @return {?}
     */
    function (force) {
        // See: https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container
        /** @type {?} */
        var width = this.canvas.clientWidth;
        /** @type {?} */
        var height = this.canvas.clientHeight;
        if (force || this.canvas.width !== width || this.canvas.height !== height) {
            // you must pass false here or three.js sadly fights the browser
            this.renderer.setSize(width, height, false);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.configRenderer = /**
     * @return {?}
     */
    function () {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(1);
        // Using setPixelRatio(devicePixelRatio) for HD-DPI can cause excessive rendering.
        // See: https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
        this.renderer.setClearColor(0x000000, 0);
        /*    const widgetPadding = 4;
            console.log('canvas.width', this.canvas.width);
            console.log('canvas.clientWidth', this.canvas.clientWidth);
            console.log('canvas.offsetWidth', this.canvas.offsetWidth);
            console.log('canvas.scrollWidth', this.canvas.scrollWidth);
            const style = getComputedStyle(this.elem.nativeElement);
            console.log('elem computed', style.width);
            // const rect = this.canvas.getBoundingClientRect();
            // console.log('rect', rect);
            const rect = this.elem.nativeElement.getBoundingClientRect();
            console.log('elem rect', rect.width);
        
            const width = this.canvas.clientWidth - (widgetPadding * 2);
            const height = this.canvas.clientHeight; // resizable layout "col" flex adjusts height to fit
            // this.renderer.setSize(width, height);
        */
        this.resizeCanvasToDisplaySize(true);
        // this.updateChildCamerasAspectRatio();
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.configControls = /**
     * @return {?}
     */
    function () {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.autoRotate = false;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
        this.controls.update();
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.createLight = /**
     * @return {?}
     */
    function () {
        this.light = new THREE.PointLight(0xffffff);
        this.light.position.set(-10, 10, 10);
        this.scene.add(this.light);
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.createMesh = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var geometry = new THREE.BoxGeometry(5, 5, 5);
        /** @type {?} */
        var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.animate = /**
     * @return {?}
     */
    function () {
        var _this = this;
        window.requestAnimationFrame(function () { return _this.animate(); });
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.01;
        // if (this.count < 6) {
        // const rect = this.canvas.getBoundingClientRect();
        // console.log('rect', rect.width);
        // this.count++;
        // }
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.updateCamera();
    };
    ThreeTestComponent.decorators = [
        { type: Component, args: [{
                    selector: 'three-test',
                    template: "<!-- <canvas #canvas (window:resize)=\"onResize($event)\"></canvas> -->\n<canvas #canvas></canvas>\n",
                    styles: ["canvas{width:100%;height:100%}"]
                }] }
    ];
    ThreeTestComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ThreeTestComponent.propDecorators = {
        canvasRef: [{ type: ViewChild, args: ['canvas',] }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return ThreeTestComponent;
}());
export { ThreeTestComponent };
if (false) {
    /** @type {?} */
    ThreeTestComponent.prototype.canvasRef;
    /** @type {?} */
    ThreeTestComponent.prototype.scene;
    /** @type {?} */
    ThreeTestComponent.prototype.camera;
    /** @type {?} */
    ThreeTestComponent.prototype.renderer;
    /** @type {?} */
    ThreeTestComponent.prototype.controls;
    /** @type {?} */
    ThreeTestComponent.prototype.mesh;
    /** @type {?} */
    ThreeTestComponent.prototype.light;
    /** @type {?} */
    ThreeTestComponent.prototype.count;
    /** @type {?} */
    ThreeTestComponent.prototype.elem;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdGVzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90aHJlZS1saWIvIiwic291cmNlcyI6WyJsaWIvdGhyZWUtdGVzdC90aHJlZS10ZXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsU0FBUyxFQUFTLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckcsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOztBQUdqRTtJQXlCRSw0QkFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQWpCcEMsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFVBQUssR0FBRyxJQUFJLENBQUM7UUFDYixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBWVIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUM7Ozs7O0lBWEQscUNBQVE7Ozs7SUFEUixVQUNTLEtBQUs7UUFDYixJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELHNCQUFZLHNDQUFNOzs7O1FBQWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTs7OztJQU9ELDRDQUFlOzs7SUFBZjtRQUNFLElB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QixvREFBb0Q7UUFDcEQsbUNBQW1DO1FBQ25DLGdCQUFnQjtRQUNoQixJQUFJO1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Z0JBOUlGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsZ0hBQTBDOztpQkFFM0M7OztnQkFUb0QsVUFBVTs7OzRCQVc1RCxTQUFTLFNBQUMsUUFBUTsyQkFVbEIsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUErSDNDLHlCQUFDO0NBQUEsQUEvSUQsSUErSUM7U0ExSVksa0JBQWtCOzs7SUFDN0IsdUNBQTJDOztJQUUzQyxtQ0FBYTs7SUFDYixvQ0FBYzs7SUFDZCxzQ0FBZ0I7O0lBQ2hCLHNDQUFnQjs7SUFDaEIsa0NBQVk7O0lBQ1osbUNBQWE7O0lBQ2IsbUNBQVU7O0lBV0Usa0NBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIElucHV0LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICdAYXZhdHNhZXYvdGhyZWUtb3JiaXRjb250cm9scy10cyc7XG4vLyBpbXBvcnQgeyBDYW1lcmFDb250cm9scyB9IGZyb20gJ2NhbWVyYS1jb250cm9scyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RocmVlLXRlc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGhyZWUtdGVzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RocmVlLXRlc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRocmVlVGVzdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdjYW52YXMnKSBjYW52YXNSZWY6IEVsZW1lbnRSZWY7XG5cbiAgc2NlbmUgPSBudWxsO1xuICBjYW1lcmEgPSBudWxsO1xuICByZW5kZXJlciA9IG51bGw7XG4gIGNvbnRyb2xzID0gbnVsbDtcbiAgbWVzaCA9IG51bGw7XG4gIGxpZ2h0ID0gbnVsbDtcbiAgY291bnQgPSAxO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBvblJlc2l6ZShldmVudCl7XG4gICB0aGlzLnJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUodHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGdldCBjYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDQ1LCAxLCAxLCAxMDAwKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmNvbmZpZ1NjZW5lKCk7XG4gICAgdGhpcy5jb25maWdDYW1lcmEoKTtcbiAgICB0aGlzLmNvbmZpZ1JlbmRlcmVyKCk7XG4gICAgdGhpcy5jb25maWdDb250cm9scygpO1xuXG4gICAgdGhpcy5jcmVhdGVMaWdodCgpO1xuICAgIHRoaXMuY3JlYXRlTWVzaCgpO1xuXG4gICAgdGhpcy5hbmltYXRlKCk7XG4gIH1cblxuICBjb25maWdTY2VuZSgpIHtcbiAgICB0aGlzLnNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoIDB4ZGRkZGRkICk7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUFzcGVjdFJhdGlvKCk6IG51bWJlciB7XG4gICAgLy8gY29uc29sZS5sb2coJ2NhbnZhcy5jbGllbnRXaWR0aDogJywgdGhpcy5jYW52YXMuY2xpZW50V2lkdGgpO1xuLy8gICAgY29uc29sZS5sb2coJ2NhbnZhcy5jbGllbnRIZWlnaHQ6ICcsIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgIGlmIChoZWlnaHQgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYW52YXMuY2xpZW50V2lkdGggLyB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICB1cGRhdGVDYW1lcmEoKTogdm9pZCB7XG4gICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gdGhpcy5jYWxjdWxhdGVBc3BlY3RSYXRpbygpO1xuICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgfVxuXG4gIGNvbmZpZ0NhbWVyYSgpIHtcbiAgICB0aGlzLnVwZGF0ZUNhbWVyYSgpO1xuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnNldCggLTE1LCAxMCwgMTUgKTtcbiAgICB0aGlzLmNhbWVyYS5sb29rQXQoIHRoaXMuc2NlbmUucG9zaXRpb24gKTtcbiAgfVxuXG4gIHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUoZm9yY2UpOiB2b2lkIHtcbiAgICAvLyBTZWU6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5ODg0NDg1L3RocmVlanMtY2FudmFzLXNpemUtYmFzZWQtb24tY29udGFpbmVyXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKGZvcmNlIHx8IHRoaXMuY2FudmFzLndpZHRoICE9PSB3aWR0aCB8fCB0aGlzLmNhbnZhcy5oZWlnaHQgIT09IGhlaWdodCkge1xuICAgICAgLy8geW91IG11c3QgcGFzcyBmYWxzZSBoZXJlIG9yIHRocmVlLmpzIHNhZGx5IGZpZ2h0cyB0aGUgYnJvd3NlclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQsIGZhbHNlKTtcbiAgICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbmZpZ1JlbmRlcmVyKCkge1xuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICBjYW52YXM6IHRoaXMuY2FudmFzLFxuICAgICAgYW50aWFsaWFzOiB0cnVlLFxuICAgICAgYWxwaGE6IHRydWVcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8oMSk7XG4gICAgIC8vIFVzaW5nIHNldFBpeGVsUmF0aW8oZGV2aWNlUGl4ZWxSYXRpbykgZm9yIEhELURQSSBjYW4gY2F1c2UgZXhjZXNzaXZlIHJlbmRlcmluZy5cbiAgICAgLy8gU2VlOiBodHRwczovL3dlYmdsZnVuZGFtZW50YWxzLm9yZy93ZWJnbC9sZXNzb25zL3dlYmdsLXJlc2l6aW5nLXRoZS1jYW52YXMuaHRtbFxuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvciggMHgwMDAwMDAsIDAgKTtcbi8qICAgIGNvbnN0IHdpZGdldFBhZGRpbmcgPSA0O1xuICAgIGNvbnNvbGUubG9nKCdjYW52YXMud2lkdGgnLCB0aGlzLmNhbnZhcy53aWR0aCk7XG4gICAgY29uc29sZS5sb2coJ2NhbnZhcy5jbGllbnRXaWR0aCcsIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoKTtcbiAgICBjb25zb2xlLmxvZygnY2FudmFzLm9mZnNldFdpZHRoJywgdGhpcy5jYW52YXMub2Zmc2V0V2lkdGgpO1xuICAgIGNvbnNvbGUubG9nKCdjYW52YXMuc2Nyb2xsV2lkdGgnLCB0aGlzLmNhbnZhcy5zY3JvbGxXaWR0aCk7XG4gICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50KTtcbiAgICBjb25zb2xlLmxvZygnZWxlbSBjb21wdXRlZCcsIHN0eWxlLndpZHRoKTtcbiAgICAvLyBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgLy8gY29uc29sZS5sb2coJ3JlY3QnLCByZWN0KTtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc29sZS5sb2coJ2VsZW0gcmVjdCcsIHJlY3Qud2lkdGgpO1xuXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCAtICh3aWRnZXRQYWRkaW5nICogMik7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0OyAvLyByZXNpemFibGUgbGF5b3V0IFwiY29sXCIgZmxleCBhZGp1c3RzIGhlaWdodCB0byBmaXRcbiAgICAvLyB0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4qL1xuICAgIHRoaXMucmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZSh0cnVlKTtcbiAgICAvLyB0aGlzLnVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCk7XG4gIH1cblxuICBjb25maWdDb250cm9scygpIHtcbiAgICB0aGlzLmNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHModGhpcy5jYW1lcmEsIHRoaXMuY2FudmFzKTtcbiAgICB0aGlzLmNvbnRyb2xzLmF1dG9Sb3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLmNvbnRyb2xzLmVuYWJsZVpvb20gPSB0cnVlO1xuICAgIHRoaXMuY29udHJvbHMuZW5hYmxlUGFuICA9IHRydWU7XG4gICAgdGhpcy5jb250cm9scy51cGRhdGUoKTtcbiAgfVxuXG4gIGNyZWF0ZUxpZ2h0KCkge1xuICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCggMHhmZmZmZmYgKTtcbiAgICB0aGlzLmxpZ2h0LnBvc2l0aW9uLnNldCggLTEwLCAxMCwgMTAgKTtcbiAgICB0aGlzLnNjZW5lLmFkZCggdGhpcy5saWdodCApO1xuICB9XG5cbiAgY3JlYXRlTWVzaCgpIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSg1LCA1LCA1KTtcbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ZmYwMDAwIH0pO1xuICAgIHRoaXMubWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgdGhpcy5zY2VuZS5hZGQodGhpcy5tZXNoKTtcbiAgfVxuXG4gIGFuaW1hdGUoKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGUoKSk7XG4gICAgLy8gdGhpcy5tZXNoLnJvdGF0aW9uLnggKz0gMC4wMTtcbiAgICAvLyB0aGlzLm1lc2gucm90YXRpb24ueSArPSAwLjAxO1xuICAgIC8vIGlmICh0aGlzLmNvdW50IDwgNikge1xuICAgIC8vIGNvbnN0IHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyBjb25zb2xlLmxvZygncmVjdCcsIHJlY3Qud2lkdGgpO1xuICAgIC8vIHRoaXMuY291bnQrKztcbiAgICAvLyB9XG4gICAgdGhpcy5jb250cm9scy51cGRhdGUoKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgdGhpcy51cGRhdGVDYW1lcmEoKTtcbiAgfVxufVxuIl19