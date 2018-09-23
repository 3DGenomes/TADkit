/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
// import { CameraControls } from 'camera-controls';
export class ThreeTestComponent {
    /**
     * @param {?} elem
     */
    constructor(elem) {
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
    onResize(event) {
        this.resizeCanvasToDisplaySize(true);
    }
    /**
     * @return {?}
     */
    get canvas() {
        return this.canvasRef.nativeElement;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.configScene();
        this.configCamera();
        this.configRenderer();
        this.configControls();
        this.createLight();
        this.createMesh();
        this.animate();
    }
    /**
     * @return {?}
     */
    configScene() {
        this.scene.background = new THREE.Color(0xdddddd);
    }
    /**
     * @return {?}
     */
    calculateAspectRatio() {
        // console.log('canvas.clientWidth: ', this.canvas.clientWidth);
        //    console.log('canvas.clientHeight: ', this.canvas.clientHeight);
        /** @type {?} */
        const height = this.canvas.clientHeight;
        if (height === 0) {
            return 0;
        }
        return this.canvas.clientWidth / this.canvas.clientHeight;
    }
    /**
     * @return {?}
     */
    updateCamera() {
        this.camera.aspect = this.calculateAspectRatio();
        this.camera.updateProjectionMatrix();
    }
    /**
     * @return {?}
     */
    configCamera() {
        this.updateCamera();
        this.camera.position.set(-15, 10, 15);
        this.camera.lookAt(this.scene.position);
    }
    /**
     * @param {?} force
     * @return {?}
     */
    resizeCanvasToDisplaySize(force) {
        // See: https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container
        /** @type {?} */
        const width = this.canvas.clientWidth;
        /** @type {?} */
        const height = this.canvas.clientHeight;
        if (force || this.canvas.width !== width || this.canvas.height !== height) {
            // you must pass false here or three.js sadly fights the browser
            this.renderer.setSize(width, height, false);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
    }
    /**
     * @return {?}
     */
    configRenderer() {
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
    }
    /**
     * @return {?}
     */
    configControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.autoRotate = false;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
        this.controls.update();
    }
    /**
     * @return {?}
     */
    createLight() {
        this.light = new THREE.PointLight(0xffffff);
        this.light.position.set(-10, 10, 10);
        this.scene.add(this.light);
    }
    /**
     * @return {?}
     */
    createMesh() {
        /** @type {?} */
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        /** @type {?} */
        const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
    }
    /**
     * @return {?}
     */
    animate() {
        window.requestAnimationFrame(() => this.animate());
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
    }
}
ThreeTestComponent.decorators = [
    { type: Component, args: [{
                selector: 'three-test',
                template: "<!-- <canvas #canvas (window:resize)=\"onResize($event)\"></canvas> -->\n<canvas #canvas></canvas>\n",
                styles: ["canvas{width:100%;height:100%}"]
            }] }
];
ThreeTestComponent.ctorParameters = () => [
    { type: ElementRef }
];
ThreeTestComponent.propDecorators = {
    canvasRef: [{ type: ViewChild, args: ['canvas',] }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdGVzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90aHJlZS1saWIvIiwic291cmNlcyI6WyJsaWIvdGhyZWUtdGVzdC90aHJlZS10ZXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsU0FBUyxFQUFTLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckcsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOztBQVFqRSxNQUFNOzs7O0lBb0JKLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFqQnBDLFVBQUssR0FBRyxJQUFJLENBQUM7UUFDYixXQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixVQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsVUFBSyxHQUFHLENBQUMsQ0FBQztRQVlSLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDOzs7OztJQVhELFFBQVEsQ0FBQyxLQUFLO1FBQ2IsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFRCxJQUFZLE1BQU07UUFDaEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztJQUN0QyxDQUFDOzs7O0lBT0QsZUFBZTtRQUNiLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztR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LElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7WUE5SUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixnSEFBMEM7O2FBRTNDOzs7WUFUb0QsVUFBVTs7O3dCQVc1RCxTQUFTLFNBQUMsUUFBUTt1QkFVbEIsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7OztJQVZ6Qyx1Q0FBMkM7O0lBRTNDLG1DQUFhOztJQUNiLG9DQUFjOztJQUNkLHNDQUFnQjs7SUFDaEIsc0NBQWdCOztJQUNoQixrQ0FBWTs7SUFDWixtQ0FBYTs7SUFDYixtQ0FBVTs7SUFXRSxrQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCwgSW5wdXQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ0BhdmF0c2Fldi90aHJlZS1vcmJpdGNvbnRyb2xzLXRzJztcbi8vIGltcG9ydCB7IENhbWVyYUNvbnRyb2xzIH0gZnJvbSAnY2FtZXJhLWNvbnRyb2xzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGhyZWUtdGVzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi90aHJlZS10ZXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGhyZWUtdGVzdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGhyZWVUZXN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ2NhbnZhcycpIGNhbnZhc1JlZjogRWxlbWVudFJlZjtcblxuICBzY2VuZSA9IG51bGw7XG4gIGNhbWVyYSA9IG51bGw7XG4gIHJlbmRlcmVyID0gbnVsbDtcbiAgY29udHJvbHMgPSBudWxsO1xuICBtZXNoID0gbnVsbDtcbiAgbGlnaHQgPSBudWxsO1xuICBjb3VudCA9IDE7XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKGV2ZW50KXtcbiAgIHRoaXMucmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZSh0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW06IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNDUsIDEsIDEsIDEwMDApO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuY29uZmlnU2NlbmUoKTtcbiAgICB0aGlzLmNvbmZpZ0NhbWVyYSgpO1xuICAgIHRoaXMuY29uZmlnUmVuZGVyZXIoKTtcbiAgICB0aGlzLmNvbmZpZ0NvbnRyb2xzKCk7XG5cbiAgICB0aGlzLmNyZWF0ZUxpZ2h0KCk7XG4gICAgdGhpcy5jcmVhdGVNZXNoKCk7XG5cbiAgICB0aGlzLmFuaW1hdGUoKTtcbiAgfVxuXG4gIGNvbmZpZ1NjZW5lKCkge1xuICAgIHRoaXMuc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvciggMHhkZGRkZGQgKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTogbnVtYmVyIHtcbiAgICAvLyBjb25zb2xlLmxvZygnY2FudmFzLmNsaWVudFdpZHRoOiAnLCB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCk7XG4vLyAgICBjb25zb2xlLmxvZygnY2FudmFzLmNsaWVudEhlaWdodDogJywgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKGhlaWdodCA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCAvIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIHVwZGF0ZUNhbWVyYSgpOiB2b2lkIHtcbiAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSB0aGlzLmNhbGN1bGF0ZUFzcGVjdFJhdGlvKCk7XG4gICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICB9XG5cbiAgY29uZmlnQ2FtZXJhKCkge1xuICAgIHRoaXMudXBkYXRlQ2FtZXJhKCk7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24uc2V0KCAtMTUsIDEwLCAxNSApO1xuICAgIHRoaXMuY2FtZXJhLmxvb2tBdCggdGhpcy5zY2VuZS5wb3NpdGlvbiApO1xuICB9XG5cbiAgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZShmb3JjZSk6IHZvaWQge1xuICAgIC8vIFNlZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjk4ODQ0ODUvdGhyZWVqcy1jYW52YXMtc2l6ZS1iYXNlZC1vbi1jb250YWluZXJcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuY2FudmFzLmNsaWVudFdpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgICBpZiAoZm9yY2UgfHwgdGhpcy5jYW52YXMud2lkdGggIT09IHdpZHRoIHx8IHRoaXMuY2FudmFzLmhlaWdodCAhPT0gaGVpZ2h0KSB7XG4gICAgICAvLyB5b3UgbXVzdCBwYXNzIGZhbHNlIGhlcmUgb3IgdGhyZWUuanMgc2FkbHkgZmlnaHRzIHRoZSBicm93c2VyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCwgZmFsc2UpO1xuICAgICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgfVxuICB9XG5cbiAgY29uZmlnUmVuZGVyZXIoKSB7XG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgIGNhbnZhczogdGhpcy5jYW52YXMsXG4gICAgICBhbnRpYWxpYXM6IHRydWUsXG4gICAgICBhbHBoYTogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbygxKTtcbiAgICAgLy8gVXNpbmcgc2V0UGl4ZWxSYXRpbyhkZXZpY2VQaXhlbFJhdGlvKSBmb3IgSEQtRFBJIGNhbiBjYXVzZSBleGNlc3NpdmUgcmVuZGVyaW5nLlxuICAgICAvLyBTZWU6IGh0dHBzOi8vd2ViZ2xmdW5kYW1lbnRhbHMub3JnL3dlYmdsL2xlc3NvbnMvd2ViZ2wtcmVzaXppbmctdGhlLWNhbnZhcy5odG1sXG4gICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKCAweDAwMDAwMCwgMCApO1xuLyogICAgY29uc3Qgd2lkZ2V0UGFkZGluZyA9IDQ7XG4gICAgY29uc29sZS5sb2coJ2NhbnZhcy53aWR0aCcsIHRoaXMuY2FudmFzLndpZHRoKTtcbiAgICBjb25zb2xlLmxvZygnY2FudmFzLmNsaWVudFdpZHRoJywgdGhpcy5jYW52YXMuY2xpZW50V2lkdGgpO1xuICAgIGNvbnNvbGUubG9nKCdjYW52YXMub2Zmc2V0V2lkdGgnLCB0aGlzLmNhbnZhcy5vZmZzZXRXaWR0aCk7XG4gICAgY29uc29sZS5sb2coJ2NhbnZhcy5zY3JvbGxXaWR0aCcsIHRoaXMuY2FudmFzLnNjcm9sbFdpZHRoKTtcbiAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGNvbnNvbGUubG9nKCdlbGVtIGNvbXB1dGVkJywgc3R5bGUud2lkdGgpO1xuICAgIC8vIGNvbnN0IHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyBjb25zb2xlLmxvZygncmVjdCcsIHJlY3QpO1xuICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zb2xlLmxvZygnZWxlbSByZWN0JywgcmVjdC53aWR0aCk7XG5cbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuY2FudmFzLmNsaWVudFdpZHRoIC0gKHdpZGdldFBhZGRpbmcgKiAyKTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7IC8vIHJlc2l6YWJsZSBsYXlvdXQgXCJjb2xcIiBmbGV4IGFkanVzdHMgaGVpZ2h0IHRvIGZpdFxuICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiovXG4gICAgdGhpcy5yZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKHRydWUpO1xuICAgIC8vIHRoaXMudXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKTtcbiAgfVxuXG4gIGNvbmZpZ0NvbnRyb2xzKCkge1xuICAgIHRoaXMuY29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyh0aGlzLmNhbWVyYSwgdGhpcy5jYW52YXMpO1xuICAgIHRoaXMuY29udHJvbHMuYXV0b1JvdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuY29udHJvbHMuZW5hYmxlWm9vbSA9IHRydWU7XG4gICAgdGhpcy5jb250cm9scy5lbmFibGVQYW4gID0gdHJ1ZTtcbiAgICB0aGlzLmNvbnRyb2xzLnVwZGF0ZSgpO1xuICB9XG5cbiAgY3JlYXRlTGlnaHQoKSB7XG4gICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KCAweGZmZmZmZiApO1xuICAgIHRoaXMubGlnaHQucG9zaXRpb24uc2V0KCAtMTAsIDEwLCAxMCApO1xuICAgIHRoaXMuc2NlbmUuYWRkKCB0aGlzLmxpZ2h0ICk7XG4gIH1cblxuICBjcmVhdGVNZXNoKCkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDUsIDUsIDUpO1xuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHhmZjAwMDAgfSk7XG4gICAgdGhpcy5tZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLm1lc2gpO1xuICB9XG5cbiAgYW5pbWF0ZSgpIHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZSgpKTtcbiAgICAvLyB0aGlzLm1lc2gucm90YXRpb24ueCArPSAwLjAxO1xuICAgIC8vIHRoaXMubWVzaC5yb3RhdGlvbi55ICs9IDAuMDE7XG4gICAgLy8gaWYgKHRoaXMuY291bnQgPCA2KSB7XG4gICAgLy8gY29uc3QgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdyZWN0JywgcmVjdC53aWR0aCk7XG4gICAgLy8gdGhpcy5jb3VudCsrO1xuICAgIC8vIH1cbiAgICB0aGlzLmNvbnRyb2xzLnVwZGF0ZSgpO1xuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgICB0aGlzLnVwZGF0ZUNhbWVyYSgpO1xuICB9XG59XG4iXX0=