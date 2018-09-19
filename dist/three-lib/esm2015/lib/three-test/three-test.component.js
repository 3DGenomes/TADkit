/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three-full';
export class ThreeTestComponent {
    constructor() {
        this.renderer = new THREE.WebGLRenderer;
        this.scene = null;
        this.camera = null;
        this.mesh = null;
        this.controls = null;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        this.controls = new THREE.OrbitControls(this.camera);
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
        this.configCamera();
        this.configRenderer();
        this.configControls();
        this.createMesh();
        this.animate();
    }
    /**
     * @return {?}
     */
    configCamera() {
        this.camera.position.set(300, 300, 300);
    }
    /**
     * @return {?}
     */
    configRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(new THREE.Color('hsl(0, 0%, 10%)'));
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.domElement.style.display = 'block';
        this.renderer.domElement.style.margin = 'auto';
        console.log(this.canvas.clientWidth);
        console.log(this.canvas.clientHeight);
        // this.canvas.appendChild(this.renderer.domElement);
    }
    /**
     * @return {?}
     */
    configControls() {
        this.controls.autoRotate = true;
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        this.controls.update();
    }
    /**
     * @return {?}
     */
    createMesh() {
        /** @type {?} */
        const geometry = new THREE.BoxGeometry(200, 200, 200);
        /** @type {?} */
        const material = new THREE.MeshBasicMaterial({ color: 0xff7f50 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
    }
    /**
     * @return {?}
     */
    animate() {
        window.requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}
ThreeTestComponent.decorators = [
    { type: Component, args: [{
                selector: 'three-test',
                template: `<!-- <canvas #canvas (window:resize)="onResize($event)"></canvas> -->
<canvas #canvas></canvas>
`,
                styles: [`canvas{width:100%;height:100%}`]
            },] },
];
/** @nocollapse */
ThreeTestComponent.ctorParameters = () => [];
ThreeTestComponent.propDecorators = {
    canvasRef: [{ type: ViewChild, args: ['canvas',] }]
};
if (false) {
    /** @type {?} */
    ThreeTestComponent.prototype.canvasRef;
    /** @type {?} */
    ThreeTestComponent.prototype.renderer;
    /** @type {?} */
    ThreeTestComponent.prototype.scene;
    /** @type {?} */
    ThreeTestComponent.prototype.camera;
    /** @type {?} */
    ThreeTestComponent.prototype.mesh;
    /** @type {?} */
    ThreeTestComponent.prototype.controls;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdGVzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90aHJlZS1saWIvIiwic291cmNlcyI6WyJsaWIvdGhyZWUtdGVzdC90aHJlZS10ZXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsU0FBUyxFQUFTLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEtBQUssS0FBSyxNQUFNLFlBQVksQ0FBQztBQVNwQyxNQUFNO0lBU0o7d0JBTlcsSUFBSSxLQUFLLENBQUMsYUFBYTtxQkFDMUIsSUFBSTtzQkFDSCxJQUFJO29CQUNOLElBQUk7d0JBQ0EsSUFBSTtRQUdiLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdEQ7Ozs7UUFFVyxNQUFNO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7Ozs7O0lBR3RDLGVBQWU7UUFDYixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFbEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ2hCOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3pDOzs7O0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDO1lBQ3RDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixTQUFTLEVBQUUsSUFBSTtTQUNoQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7S0FFdkM7Ozs7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBSSxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN4Qjs7OztJQUVELFVBQVU7O1FBQ1IsTUFBTSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7O1FBQ3RELE1BQU0sUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRS9DLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjs7OztJQUVELE9BQU87UUFDTCxNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMvQzs7O1lBMUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFOztDQUVYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLGdDQUFnQyxDQUFDO2FBQzNDOzs7Ozt3QkFFRSxTQUFTLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RocmVlLXRlc3QnLFxuICB0ZW1wbGF0ZTogYDwhLS0gPGNhbnZhcyAjY2FudmFzICh3aW5kb3c6cmVzaXplKT1cIm9uUmVzaXplKCRldmVudClcIj48L2NhbnZhcz4gLS0+XG48Y2FudmFzICNjYW52YXM+PC9jYW52YXM+XG5gLFxuICBzdHlsZXM6IFtgY2FudmFze3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9YF1cbn0pXG5leHBvcnQgY2xhc3MgVGhyZWVUZXN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ2NhbnZhcycpIGNhbnZhc1JlZjogRWxlbWVudFJlZjtcblxuICByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuICBzY2VuZSA9IG51bGw7XG4gIGNhbWVyYSA9IG51bGw7XG4gIG1lc2ggPSBudWxsO1xuICBjb250cm9scyA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDQ1LCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMSwgMTAwMCk7XG4gICAgdGhpcy5jb250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKHRoaXMuY2FtZXJhKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5jb25maWdDYW1lcmEoKTtcbiAgICB0aGlzLmNvbmZpZ1JlbmRlcmVyKCk7XG4gICAgdGhpcy5jb25maWdDb250cm9scygpO1xuXG4gICAgdGhpcy5jcmVhdGVNZXNoKCk7XG5cbiAgICB0aGlzLmFuaW1hdGUoKTtcbiAgfVxuXG4gIGNvbmZpZ0NhbWVyYSgpIHtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi5zZXQoMzAwLCAzMDAsIDMwMCk7XG4gIH1cblxuICBjb25maWdSZW5kZXJlcigpIHtcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xuICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcbiAgICAgIGFudGlhbGlhczogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKG5ldyBUSFJFRS5Db2xvcignaHNsKDAsIDAlLCAxMCUpJykpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCwgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcbiAgICB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLm1hcmdpbiA9ICdhdXRvJztcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCk7XG4gICAgY29uc29sZS5sb2codGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcbiAgICAvLyB0aGlzLmNhbnZhcy5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICB9XG5cbiAgY29uZmlnQ29udHJvbHMoKSB7XG4gICAgdGhpcy5jb250cm9scy5hdXRvUm90YXRlID0gdHJ1ZTtcbiAgICB0aGlzLmNvbnRyb2xzLmVuYWJsZVpvb20gPSBmYWxzZTtcbiAgICB0aGlzLmNvbnRyb2xzLmVuYWJsZVBhbiAgPSBmYWxzZTtcbiAgICB0aGlzLmNvbnRyb2xzLnVwZGF0ZSgpO1xuICB9XG5cbiAgY3JlYXRlTWVzaCgpIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgyMDAsIDIwMCwgMjAwKTtcbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmN2Y1MCB9KTtcbiAgICB0aGlzLm1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuXG4gICAgdGhpcy5zY2VuZS5hZGQodGhpcy5tZXNoKTtcbiAgfVxuXG4gIGFuaW1hdGUoKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGUoKSk7XG4gICAgdGhpcy5jb250cm9scy51cGRhdGUoKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gIH1cbn1cbiJdfQ==