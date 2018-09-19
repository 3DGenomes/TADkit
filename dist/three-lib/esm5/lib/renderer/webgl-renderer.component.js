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
        this.renderer.setPixelRatio(devicePixelRatio);
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
                },] },
    ];
    /** @nocollapse */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGVBQWUsRUFDZixZQUFZLEVBQ1osU0FBUyxFQUlWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxLQUFLLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBb0IxRDsrQkFSMEIsS0FBSztRQVM3QixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0Qzs7OztJQUVELGdEQUFlOzs7SUFBZjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7MEJBa0JVLDhDQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBQ25CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQzs7Ozs7MEJBR1osMENBQU07Ozs7O1lBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7Ozs7Ozs7O0lBRzlCLCtDQUFjOzs7O1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQztZQUN0QyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXpFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztRQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRS9CLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7SUFHVCx1Q0FBTTs7Ozs7O1FBR1gsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFOztZQUN4QixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQzs7WUFDbEQsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQzs7OztZQUlwRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLEVBQUUsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzFFOzs7Ozs7SUFJSyxxREFBb0I7Ozs7O1FBQzFCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNoQixPQUFPLENBQUMsQ0FBQztTQUNWO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzs7Ozs7O0lBSXJELHlDQUFROzs7O0lBRGYsVUFDZ0IsS0FBWTtRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV4RyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUVyQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNmOzs7O0lBRU0sOERBQTZCOzs7OztRQUNsQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUM7OztnQkExRzdFLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsNkJBQ0Y7b0JBQ1IsTUFBTSxFQUFFLENBQUMsZ0NBQWdDLENBQUM7aUJBQzNDOzs7Ozs0QkFNRSxTQUFTLFNBQUMsUUFBUTtrQ0FHbEIsZUFBZSxTQUFDLGNBQWM7bUNBQzlCLGVBQWUsU0FBQyxjQUFjOzJCQTZFOUIsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7aUNBN0czQzs7U0F1QmEsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQ29udGVudENoaWxkcmVuLFxuICBIb3N0TGlzdGVuZXIsXG4gIFF1ZXJ5TGlzdCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG4gIEFmdGVyVmlld0luaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IFNjZW5lRGlyZWN0aXZlIH0gZnJvbSAnLi4vb2JqZWN0cy9zY2VuZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDYW1lcmEgfSBmcm9tICcuLi9jYW1lcmFzL2Fic3RyYWN0LWNhbWVyYSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGhyZWUtd2ViZ2wtcmVuZGVyZXInLFxuICB0ZW1wbGF0ZTogYDxjYW52YXMgI2NhbnZhcz5cbjwvY2FudmFzPmAsXG4gIHN0eWxlczogW2BjYW52YXN7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgcHJpdmF0ZSByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlcjtcbiAgcHJpdmF0ZSB2aWV3SW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCdjYW52YXMnKVxuICBwcml2YXRlIGNhbnZhc1JlZjogRWxlbWVudFJlZjsgLy8gTk9URTogc2F5IGJ5ZS1ieWUgdG8gc2VydmVyLXNpZGUgcmVuZGVyaW5nIDspXG5cbiAgQENvbnRlbnRDaGlsZHJlbihTY2VuZURpcmVjdGl2ZSkgc2NlbmVDb21wb25lbnRzOiBRdWVyeUxpc3Q8U2NlbmVEaXJlY3RpdmU+OyAvLyBUT0RPOiBNdWx0aXBsZSBzY2VuZXNcbiAgQENvbnRlbnRDaGlsZHJlbihBYnN0cmFjdENhbWVyYSkgY2FtZXJhQ29tcG9uZW50czogUXVlcnlMaXN0PEFic3RyYWN0Q2FtZXJhPFRIUkVFLkNhbWVyYT4+OyAvLyBUT0RPOiBNdWx0aXBsZSBjYW1lcmFzXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50LmNvbnN0cnVjdG9yJyk7XG4gICAgdGhpcy5yZW5kZXIgPSB0aGlzLnJlbmRlci5iaW5kKHRoaXMpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5uZ0FmdGVyVmlld0luaXQnKTtcbiAgICB0aGlzLnZpZXdJbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy5zdGFydFJlbmRlcmluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByZW5kZXIgcGFuZSBvbiB3aGljaCB0aGUgc2NlbmUgaXMgcmVuZGVyZWQuXG4gICAqIEN1cnJlbnRseSwgb25seSB0aGUgV2ViR0wgcmVuZGVyZXIgd2l0aCBhIGNhbnZhcyBpcyB1c2VkIGluIHRoaXNcbiAgICogaW1wbGVtZW50YXRpb24sIHNvIHRoaXMgcHJvcGVydHkgd2lsbCBhbHdheXMgYmUgYW4gRWxlbWVudFJlZiB0byB0aGVcbiAgICogdW5kZXJseWluZyA8Y2FudmFzPiBlbGVtZW50LlxuICAgKlxuICAgKiBAZXhhbXBsZSBUaGlzIHByb3BlcnR5IGNhbiBiZSB1c2VkIHRvIHJlc3RyaWN0IHRoZSBvcmJpdCBjb250cm9scyAoaS5lLiB0aGVcbiAgICogYXJlYSB3aGljaCBpcyBsaXN0ZW5lZCBmb3IgbW91c2UgbW92ZSBhbmQgem9vbSBldmVudHMpIHRvIHRoZSByZW5kZXJpbmcgcGFuZTpcbiAgICogYGBgXG4gICAqIDx0aHJlZS1vcmJpdC1jb250cm9scyBbcm90YXRlU3BlZWRdPTEgW3pvb21TcGVlZF09MS4yIFtsaXN0ZW5pbmdDb250cm9sRWxlbWVudF09bWFpblJlbmRlcmVyLnJlbmRlclBhbmU+XG4gICAqICAgPHRocmVlLXJlbmRlcmVyICNtYWluUmVuZGVyZXI+XG4gICAqICAgICAuLi5cbiAgICogICA8L3RocmVlLXJlbmRlcmVyPlxuICAgKiA8L3RocmVlLW9yYml0LWNvbnRyb2xzPlxuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyBnZXQgcmVuZGVyUGFuZSgpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNSZWY7XG4gIH1cblxuICBwcml2YXRlIGdldCBjYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydFJlbmRlcmluZygpIHtcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQuc3RhcnRSZW5kZXJpbmcnKTtcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xuICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcbiAgICAgIGFudGlhbGlhczogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyhkZXZpY2VQaXhlbFJhdGlvKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUodGhpcy5jYW52YXMuY2xpZW50V2lkdGgsIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoMHhmZmZmZmYsIDEpO1xuICAgIHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gdHJ1ZTtcblxuICAgIHRoaXMudXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICAvLyBpZiAodGhpcy5zY2VuZUNvbXBvbmVudHMgIT0gdW5kZWZpbmVkICYmIHRoaXMuc2NlbmVDb21wb25lbnRzLmxlbmd0aCA9PSAxICYmXG4gICAgLy8gICAgIHRoaXMuY2FtZXJhQ29tcG9uZW50cyAhPSB1bmRlZmluZWQgJiYgdGhpcy5jYW1lcmFDb21wb25lbnRzLmxlbmd0aCA9PSAxKSB7XG4gICAgaWYgKHRoaXMudmlld0luaXRpYWxpemVkKSB7XG4gICAgICBjb25zdCBzY2VuZUNvbXBvbmVudCA9IHRoaXMuc2NlbmVDb21wb25lbnRzLmZpcnN0O1xuICAgICAgY29uc3QgY2FtZXJhQ29tcG9uZW50ID0gdGhpcy5jYW1lcmFDb21wb25lbnRzLmZpcnN0O1xuICAgICAgLy8gY29uc29sZS5sb2coXCJyZW5kZXJcIik7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzY2VuZS5nZXRPYmplY3QoKSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhjYW1lcmEuY2FtZXJhKTtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHNjZW5lQ29tcG9uZW50LmdldE9iamVjdCgpLCBjYW1lcmFDb21wb25lbnQuY2FtZXJhKTtcbiAgICB9XG4gICAgLy8gfVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVBc3BlY3RSYXRpbygpOiBudW1iZXIge1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgICBpZiAoaGVpZ2h0ID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoIC8gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvblJlc2l6ZShldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50Lm9uUmVzaXplOiAnICsgdGhpcy5jYW52YXMuY2xpZW50V2lkdGggKyAnLCAnICsgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcblxuICAgIHRoaXMudXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCwgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCkge1xuICAgIGNvbnN0IGFzcGVjdCA9IHRoaXMuY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLmNhbWVyYUNvbXBvbmVudHMuZm9yRWFjaChjYW1lcmEgPT4gY2FtZXJhLnVwZGF0ZUFzcGVjdFJhdGlvKGFzcGVjdCkpO1xuICB9XG5cbiAgLypcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5cHJlc3MnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25LZXlQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnNvbGUubG9nKFwib25LZXlQcmVzczogXCIgKyBldmVudC5rZXkpO1xuICB9XG4qL1xuXG59XG4iXX0=