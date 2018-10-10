/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, ElementRef, ContentChildren, HostListener, QueryList } from '@angular/core';
import * as THREE from 'three-full';
import { SceneDirective } from '../objects/scene.directive';
import { AbstractCamera } from '../cameras/abstract-camera';
var WebGLRendererComponent = /** @class */ (function () {
    function WebGLRendererComponent() {
        this.viewInitialized = false;
        console.log('RendererComponent.constructor');
        this.render = this.render.bind(this);
    }
    /**
     * @return {?}
     */
    WebGLRendererComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        console.log('RendererComponent.ngAfterViewInit');
        this.viewInitialized = true;
        this.startRendering();
    };
    Object.defineProperty(WebGLRendererComponent.prototype, "renderPane", {
        /**
         * The render pane on which the scene is rendered.
         * Currently, only the WebGL renderer with a canvas is used in this
         * implementation, so this property will always be an ElementRef to the
         * underlying <canvas> element.
         *
         * @example This property can be used to restrict the orbit controls (i.e. the
         * area which is listened for mouse move and zoom events) to the rendering pane:
         * ```
         * <three-orbit-controls [rotateSpeed]=1 [zoomSpeed]=1.2 [listeningControlElement]=mainRenderer.renderPane>
         *   <three-renderer #mainRenderer>
         *     ...
         *   </three-renderer>
         * </three-orbit-controls>
         * ```
         */
        get: /**
         * The render pane on which the scene is rendered.
         * Currently, only the WebGL renderer with a canvas is used in this
         * implementation, so this property will always be an ElementRef to the
         * underlying <canvas> element.
         *
         * \@example This property can be used to restrict the orbit controls (i.e. the
         * area which is listened for mouse move and zoom events) to the rendering pane:
         * ```
         * <three-orbit-controls [rotateSpeed]=1 [zoomSpeed]=1.2 [listeningControlElement]=mainRenderer.renderPane>
         *   <three-renderer #mainRenderer>
         *     ...
         *   </three-renderer>
         * </three-orbit-controls>
         * ```
         * @return {?}
         */
        function () {
            return this.canvasRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRendererComponent.prototype, "canvas", {
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
    WebGLRendererComponent.prototype.startRendering = /**
     * @return {?}
     */
    function () {
        console.log('RendererComponent.startRendering');
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0xffffff, 1);
        this.renderer.autoClear = true;
        this.updateChildCamerasAspectRatio();
        this.render();
    };
    /**
     * @return {?}
     */
    WebGLRendererComponent.prototype.render = /**
     * @return {?}
     */
    function () {
        // if (this.sceneComponents != undefined && this.sceneComponents.length == 1 &&
        //     this.cameraComponents != undefined && this.cameraComponents.length == 1) {
        if (this.viewInitialized) {
            /** @type {?} */
            var sceneComponent = this.sceneComponents.first;
            /** @type {?} */
            var cameraComponent = this.cameraComponents.first;
            // console.log("render");
            // console.log(scene.getObject());
            // console.log(camera.camera);
            this.renderer.render(sceneComponent.getObject(), cameraComponent.camera);
        }
        // }
    };
    /**
     * @return {?}
     */
    WebGLRendererComponent.prototype.calculateAspectRatio = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var height = this.canvas.clientHeight;
        if (height === 0) {
            return 0;
        }
        return this.canvas.clientWidth / this.canvas.clientHeight;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    WebGLRendererComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        console.log('RendererComponent.onResize: ' + this.canvas.clientWidth + ', ' + this.canvas.clientHeight);
        this.updateChildCamerasAspectRatio();
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.render();
    };
    /**
     * @return {?}
     */
    WebGLRendererComponent.prototype.updateChildCamerasAspectRatio = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var aspect = this.calculateAspectRatio();
        this.cameraComponents.forEach(function (camera) { return camera.updateAspectRatio(aspect); });
    };
    WebGLRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'three-webgl-renderer',
                    template: "<canvas #canvas>\n</canvas>",
                    styles: ["canvas{width:100%;height:100%}"]
                }] }
    ];
    WebGLRendererComponent.ctorParameters = function () { return []; };
    WebGLRendererComponent.propDecorators = {
        canvasRef: [{ type: ViewChild, args: ['canvas',] }],
        sceneComponents: [{ type: ContentChildren, args: [SceneDirective,] }],
        cameraComponents: [{ type: ContentChildren, args: [AbstractCamera,] }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return WebGLRendererComponent;
}());
export { WebGLRendererComponent };
if (false) {
    /** @type {?} */
    WebGLRendererComponent.prototype.renderer;
    /** @type {?} */
    WebGLRendererComponent.prototype.viewInitialized;
    /** @type {?} */
    WebGLRendererComponent.prototype.canvasRef;
    /** @type {?} */
    WebGLRendererComponent.prototype.sceneComponents;
    /** @type {?} */
    WebGLRendererComponent.prototype.cameraComponents;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQzlFLFNBQVMsRUFBc0MsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxLQUFLLEtBQUssTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUc1RDtJQWdCRTtRQVJRLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBUzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7SUFFRCxnREFBZTs7O0lBQWY7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFrQkQsc0JBQVcsOENBQVU7UUFoQnJCOzs7Ozs7Ozs7Ozs7Ozs7V0FlRzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBWSwwQ0FBTTs7OztRQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7Ozs7SUFFTywrQ0FBYzs7O0lBQXRC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RSxzQkFBc0I7b0JBQ2hDLHVDQUE4Qzs7aUJBRS9DOzs7OzRCQU1FLFNBQVMsU0FBQyxRQUFRO2tDQUdsQixlQUFlLFNBQUMsY0FBYzttQ0FDOUIsZUFBZSxTQUFDLGNBQWM7MkJBNkU5QixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOztJQXdCM0MsNkJBQUM7Q0FBQSxBQW5IRCxJQW1IQztTQTlHWSxzQkFBc0I7OztJQUVqQywwQ0FBc0M7O0lBQ3RDLGlEQUFnQzs7SUFFaEMsMkNBQzhCOztJQUU5QixpREFBNEU7O0lBQzVFLGtEQUEyRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIENvbnRlbnRDaGlsZHJlbiwgSG9zdExpc3RlbmVyLFxuICBRdWVyeUxpc3QsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBBZnRlclZpZXdJbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgU2NlbmVEaXJlY3RpdmUgfSBmcm9tICcuLi9vYmplY3RzL3NjZW5lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENhbWVyYSB9IGZyb20gJy4uL2NhbWVyYXMvYWJzdHJhY3QtY2FtZXJhJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aHJlZS13ZWJnbC1yZW5kZXJlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgV2ViR0xSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIHByaXZhdGUgcmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXI7XG4gIHByaXZhdGUgdmlld0luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZCgnY2FudmFzJylcbiAgcHJpdmF0ZSBjYW52YXNSZWY6IEVsZW1lbnRSZWY7IC8vIE5PVEU6IHNheSBieWUtYnllIHRvIHNlcnZlci1zaWRlIHJlbmRlcmluZyA7KVxuXG4gIEBDb250ZW50Q2hpbGRyZW4oU2NlbmVEaXJlY3RpdmUpIHNjZW5lQ29tcG9uZW50czogUXVlcnlMaXN0PFNjZW5lRGlyZWN0aXZlPjsgLy8gVE9ETzogTXVsdGlwbGUgc2NlbmVzXG4gIEBDb250ZW50Q2hpbGRyZW4oQWJzdHJhY3RDYW1lcmEpIGNhbWVyYUNvbXBvbmVudHM6IFF1ZXJ5TGlzdDxBYnN0cmFjdENhbWVyYTxUSFJFRS5DYW1lcmE+PjsgLy8gVE9ETzogTXVsdGlwbGUgY2FtZXJhc1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5jb25zdHJ1Y3RvcicpO1xuICAgIHRoaXMucmVuZGVyID0gdGhpcy5yZW5kZXIuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgdGhpcy52aWV3SW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHRoaXMuc3RhcnRSZW5kZXJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcmVuZGVyIHBhbmUgb24gd2hpY2ggdGhlIHNjZW5lIGlzIHJlbmRlcmVkLlxuICAgKiBDdXJyZW50bHksIG9ubHkgdGhlIFdlYkdMIHJlbmRlcmVyIHdpdGggYSBjYW52YXMgaXMgdXNlZCBpbiB0aGlzXG4gICAqIGltcGxlbWVudGF0aW9uLCBzbyB0aGlzIHByb3BlcnR5IHdpbGwgYWx3YXlzIGJlIGFuIEVsZW1lbnRSZWYgdG8gdGhlXG4gICAqIHVuZGVybHlpbmcgPGNhbnZhcz4gZWxlbWVudC5cbiAgICpcbiAgICogQGV4YW1wbGUgVGhpcyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCB0byByZXN0cmljdCB0aGUgb3JiaXQgY29udHJvbHMgKGkuZS4gdGhlXG4gICAqIGFyZWEgd2hpY2ggaXMgbGlzdGVuZWQgZm9yIG1vdXNlIG1vdmUgYW5kIHpvb20gZXZlbnRzKSB0byB0aGUgcmVuZGVyaW5nIHBhbmU6XG4gICAqIGBgYFxuICAgKiA8dGhyZWUtb3JiaXQtY29udHJvbHMgW3JvdGF0ZVNwZWVkXT0xIFt6b29tU3BlZWRdPTEuMiBbbGlzdGVuaW5nQ29udHJvbEVsZW1lbnRdPW1haW5SZW5kZXJlci5yZW5kZXJQYW5lPlxuICAgKiAgIDx0aHJlZS1yZW5kZXJlciAjbWFpblJlbmRlcmVyPlxuICAgKiAgICAgLi4uXG4gICAqICAgPC90aHJlZS1yZW5kZXJlcj5cbiAgICogPC90aHJlZS1vcmJpdC1jb250cm9scz5cbiAgICogYGBgXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlbmRlclBhbmUoKTogRWxlbWVudFJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzUmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhcnRSZW5kZXJpbmcoKSB7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50LnN0YXJ0UmVuZGVyaW5nJyk7XG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgIGNhbnZhczogdGhpcy5jYW52YXMsXG4gICAgICBhbnRpYWxpYXM6IHRydWVcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCwgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMucmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcigweGZmZmZmZiwgMSk7XG4gICAgdGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSB0cnVlO1xuXG4gICAgdGhpcy51cGRhdGVDaGlsZENhbWVyYXNBc3BlY3RSYXRpbygpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIC8vIGlmICh0aGlzLnNjZW5lQ29tcG9uZW50cyAhPSB1bmRlZmluZWQgJiYgdGhpcy5zY2VuZUNvbXBvbmVudHMubGVuZ3RoID09IDEgJiZcbiAgICAvLyAgICAgdGhpcy5jYW1lcmFDb21wb25lbnRzICE9IHVuZGVmaW5lZCAmJiB0aGlzLmNhbWVyYUNvbXBvbmVudHMubGVuZ3RoID09IDEpIHtcbiAgICBpZiAodGhpcy52aWV3SW5pdGlhbGl6ZWQpIHtcbiAgICAgIGNvbnN0IHNjZW5lQ29tcG9uZW50ID0gdGhpcy5zY2VuZUNvbXBvbmVudHMuZmlyc3Q7XG4gICAgICBjb25zdCBjYW1lcmFDb21wb25lbnQgPSB0aGlzLmNhbWVyYUNvbXBvbmVudHMuZmlyc3Q7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInJlbmRlclwiKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHNjZW5lLmdldE9iamVjdCgpKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGNhbWVyYS5jYW1lcmEpO1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoc2NlbmVDb21wb25lbnQuZ2V0T2JqZWN0KCksIGNhbWVyYUNvbXBvbmVudC5jYW1lcmEpO1xuICAgIH1cbiAgICAvLyB9XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUFzcGVjdFJhdGlvKCk6IG51bWJlciB7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgIGlmIChoZWlnaHQgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYW52YXMuY2xpZW50V2lkdGggLyB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uUmVzaXplKGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQub25SZXNpemU6ICcgKyB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCArICcsICcgKyB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuXG4gICAgdGhpcy51cGRhdGVDaGlsZENhbWVyYXNBc3BlY3RSYXRpbygpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHRoaXMuY2FudmFzLmNsaWVudFdpZHRoLCB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKSB7XG4gICAgY29uc3QgYXNwZWN0ID0gdGhpcy5jYWxjdWxhdGVBc3BlY3RSYXRpbygpO1xuICAgIHRoaXMuY2FtZXJhQ29tcG9uZW50cy5mb3JFYWNoKGNhbWVyYSA9PiBjYW1lcmEudXBkYXRlQXNwZWN0UmF0aW8oYXNwZWN0KSk7XG4gIH1cblxuICAvKlxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlwcmVzcycsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbktleVByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coXCJvbktleVByZXNzOiBcIiArIGV2ZW50LmtleSk7XG4gIH1cbiovXG5cbn1cbiJdfQ==