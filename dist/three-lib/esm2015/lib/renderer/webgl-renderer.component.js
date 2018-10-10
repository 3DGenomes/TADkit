/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, ElementRef, ContentChildren, HostListener, QueryList } from '@angular/core';
import * as THREE from 'three-full';
import { SceneDirective } from '../objects/scene.directive';
import { AbstractCamera } from '../cameras/abstract-camera';
export class WebGLRendererComponent {
    // TODO: Multiple cameras
    constructor() {
        this.viewInitialized = false;
        console.log('RendererComponent.constructor');
        this.render = this.render.bind(this);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        console.log('RendererComponent.ngAfterViewInit');
        this.viewInitialized = true;
        this.startRendering();
    }
    /**
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
    get renderPane() {
        return this.canvasRef;
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
    startRendering() {
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
    }
    /**
     * @return {?}
     */
    render() {
        // if (this.sceneComponents != undefined && this.sceneComponents.length == 1 &&
        //     this.cameraComponents != undefined && this.cameraComponents.length == 1) {
        if (this.viewInitialized) {
            /** @type {?} */
            const sceneComponent = this.sceneComponents.first;
            /** @type {?} */
            const cameraComponent = this.cameraComponents.first;
            // console.log("render");
            // console.log(scene.getObject());
            // console.log(camera.camera);
            this.renderer.render(sceneComponent.getObject(), cameraComponent.camera);
        }
        // }
    }
    /**
     * @return {?}
     */
    calculateAspectRatio() {
        /** @type {?} */
        const height = this.canvas.clientHeight;
        if (height === 0) {
            return 0;
        }
        return this.canvas.clientWidth / this.canvas.clientHeight;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        console.log('RendererComponent.onResize: ' + this.canvas.clientWidth + ', ' + this.canvas.clientHeight);
        this.updateChildCamerasAspectRatio();
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.render();
    }
    /**
     * @return {?}
     */
    updateChildCamerasAspectRatio() {
        /** @type {?} */
        const aspect = this.calculateAspectRatio();
        this.cameraComponents.forEach(camera => camera.updateAspectRatio(aspect));
    }
}
WebGLRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'three-webgl-renderer',
                template: "<canvas #canvas>\n</canvas>",
                styles: ["canvas{width:100%;height:100%}"]
            }] }
];
WebGLRendererComponent.ctorParameters = () => [];
WebGLRendererComponent.propDecorators = {
    canvasRef: [{ type: ViewChild, args: ['canvas',] }],
    sceneComponents: [{ type: ContentChildren, args: [SceneDirective,] }],
    cameraComponents: [{ type: ContentChildren, args: [AbstractCamera,] }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQzlFLFNBQVMsRUFBc0MsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxLQUFLLEtBQUssTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQVE1RCxNQUFNOztJQVdKO1FBUlEsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFTOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtCRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFFRCxJQUFZLE1BQU07UUFDaEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRU8sY0FBYztRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEs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QVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7SUFwRnpDLDBDQUFzQzs7SUFDdEMsaURBQWdDOztJQUVoQywyQ0FDOEI7O0lBRTlCLGlEQUE0RTs7SUFDNUUsa0RBQTJGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgQ29udGVudENoaWxkcmVuLCBIb3N0TGlzdGVuZXIsXG4gIFF1ZXJ5TGlzdCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIEFmdGVyVmlld0luaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBTY2VuZURpcmVjdGl2ZSB9IGZyb20gJy4uL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEFic3RyYWN0Q2FtZXJhIH0gZnJvbSAnLi4vY2FtZXJhcy9hYnN0cmFjdC1jYW1lcmEnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RocmVlLXdlYmdsLXJlbmRlcmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgcHJpdmF0ZSByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlcjtcbiAgcHJpdmF0ZSB2aWV3SW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCdjYW52YXMnKVxuICBwcml2YXRlIGNhbnZhc1JlZjogRWxlbWVudFJlZjsgLy8gTk9URTogc2F5IGJ5ZS1ieWUgdG8gc2VydmVyLXNpZGUgcmVuZGVyaW5nIDspXG5cbiAgQENvbnRlbnRDaGlsZHJlbihTY2VuZURpcmVjdGl2ZSkgc2NlbmVDb21wb25lbnRzOiBRdWVyeUxpc3Q8U2NlbmVEaXJlY3RpdmU+OyAvLyBUT0RPOiBNdWx0aXBsZSBzY2VuZXNcbiAgQENvbnRlbnRDaGlsZHJlbihBYnN0cmFjdENhbWVyYSkgY2FtZXJhQ29tcG9uZW50czogUXVlcnlMaXN0PEFic3RyYWN0Q2FtZXJhPFRIUkVFLkNhbWVyYT4+OyAvLyBUT0RPOiBNdWx0aXBsZSBjYW1lcmFzXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50LmNvbnN0cnVjdG9yJyk7XG4gICAgdGhpcy5yZW5kZXIgPSB0aGlzLnJlbmRlci5iaW5kKHRoaXMpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5uZ0FmdGVyVmlld0luaXQnKTtcbiAgICB0aGlzLnZpZXdJbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy5zdGFydFJlbmRlcmluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByZW5kZXIgcGFuZSBvbiB3aGljaCB0aGUgc2NlbmUgaXMgcmVuZGVyZWQuXG4gICAqIEN1cnJlbnRseSwgb25seSB0aGUgV2ViR0wgcmVuZGVyZXIgd2l0aCBhIGNhbnZhcyBpcyB1c2VkIGluIHRoaXNcbiAgICogaW1wbGVtZW50YXRpb24sIHNvIHRoaXMgcHJvcGVydHkgd2lsbCBhbHdheXMgYmUgYW4gRWxlbWVudFJlZiB0byB0aGVcbiAgICogdW5kZXJseWluZyA8Y2FudmFzPiBlbGVtZW50LlxuICAgKlxuICAgKiBAZXhhbXBsZSBUaGlzIHByb3BlcnR5IGNhbiBiZSB1c2VkIHRvIHJlc3RyaWN0IHRoZSBvcmJpdCBjb250cm9scyAoaS5lLiB0aGVcbiAgICogYXJlYSB3aGljaCBpcyBsaXN0ZW5lZCBmb3IgbW91c2UgbW92ZSBhbmQgem9vbSBldmVudHMpIHRvIHRoZSByZW5kZXJpbmcgcGFuZTpcbiAgICogYGBgXG4gICAqIDx0aHJlZS1vcmJpdC1jb250cm9scyBbcm90YXRlU3BlZWRdPTEgW3pvb21TcGVlZF09MS4yIFtsaXN0ZW5pbmdDb250cm9sRWxlbWVudF09bWFpblJlbmRlcmVyLnJlbmRlclBhbmU+XG4gICAqICAgPHRocmVlLXJlbmRlcmVyICNtYWluUmVuZGVyZXI+XG4gICAqICAgICAuLi5cbiAgICogICA8L3RocmVlLXJlbmRlcmVyPlxuICAgKiA8L3RocmVlLW9yYml0LWNvbnRyb2xzPlxuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyBnZXQgcmVuZGVyUGFuZSgpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNSZWY7XG4gIH1cblxuICBwcml2YXRlIGdldCBjYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydFJlbmRlcmluZygpIHtcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQuc3RhcnRSZW5kZXJpbmcnKTtcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xuICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcbiAgICAgIGFudGlhbGlhczogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHRoaXMuY2FudmFzLmNsaWVudFdpZHRoLCB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5yZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXA7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKDB4ZmZmZmZmLCAxKTtcbiAgICB0aGlzLnJlbmRlcmVyLmF1dG9DbGVhciA9IHRydWU7XG5cbiAgICB0aGlzLnVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgLy8gaWYgKHRoaXMuc2NlbmVDb21wb25lbnRzICE9IHVuZGVmaW5lZCAmJiB0aGlzLnNjZW5lQ29tcG9uZW50cy5sZW5ndGggPT0gMSAmJlxuICAgIC8vICAgICB0aGlzLmNhbWVyYUNvbXBvbmVudHMgIT0gdW5kZWZpbmVkICYmIHRoaXMuY2FtZXJhQ29tcG9uZW50cy5sZW5ndGggPT0gMSkge1xuICAgIGlmICh0aGlzLnZpZXdJbml0aWFsaXplZCkge1xuICAgICAgY29uc3Qgc2NlbmVDb21wb25lbnQgPSB0aGlzLnNjZW5lQ29tcG9uZW50cy5maXJzdDtcbiAgICAgIGNvbnN0IGNhbWVyYUNvbXBvbmVudCA9IHRoaXMuY2FtZXJhQ29tcG9uZW50cy5maXJzdDtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVuZGVyXCIpO1xuICAgICAgLy8gY29uc29sZS5sb2coc2NlbmUuZ2V0T2JqZWN0KCkpO1xuICAgICAgLy8gY29uc29sZS5sb2coY2FtZXJhLmNhbWVyYSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihzY2VuZUNvbXBvbmVudC5nZXRPYmplY3QoKSwgY2FtZXJhQ29tcG9uZW50LmNhbWVyYSk7XG4gICAgfVxuICAgIC8vIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTogbnVtYmVyIHtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKGhlaWdodCA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCAvIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25SZXNpemUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgdGhpcy5jYW52YXMuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5vblJlc2l6ZTogJyArIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoICsgJywgJyArIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG5cbiAgICB0aGlzLnVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUodGhpcy5jYW52YXMuY2xpZW50V2lkdGgsIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVDaGlsZENhbWVyYXNBc3BlY3RSYXRpbygpIHtcbiAgICBjb25zdCBhc3BlY3QgPSB0aGlzLmNhbGN1bGF0ZUFzcGVjdFJhdGlvKCk7XG4gICAgdGhpcy5jYW1lcmFDb21wb25lbnRzLmZvckVhY2goY2FtZXJhID0+IGNhbWVyYS51cGRhdGVBc3BlY3RSYXRpbyhhc3BlY3QpKTtcbiAgfVxuXG4gIC8qXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleXByZXNzJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uS2V5UHJlc3MoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhcIm9uS2V5UHJlc3M6IFwiICsgZXZlbnQua2V5KTtcbiAgfVxuKi9cblxufVxuIl19