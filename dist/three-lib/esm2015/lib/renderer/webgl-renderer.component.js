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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGVBQWUsRUFDZixZQUFZLEVBQ1osU0FBUyxFQUlWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxLQUFLLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFRNUQsTUFBTTs7SUFXSjtRQVJRLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBUzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrQkQsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7O0lBRUQsSUFBWSxNQUFNO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVPLGNBQWM7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdB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LFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOzs7O0lBcEZ6QywwQ0FBc0M7O0lBQ3RDLGlEQUFnQzs7SUFFaEMsMkNBQzhCOztJQUU5QixpREFBNEU7O0lBQzVFLGtEQUEyRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgSG9zdExpc3RlbmVyLFxuICBRdWVyeUxpc3QsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0LFxuICBBZnRlclZpZXdJbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBTY2VuZURpcmVjdGl2ZSB9IGZyb20gJy4uL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEFic3RyYWN0Q2FtZXJhIH0gZnJvbSAnLi4vY2FtZXJhcy9hYnN0cmFjdC1jYW1lcmEnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RocmVlLXdlYmdsLXJlbmRlcmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgcHJpdmF0ZSByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlcjtcbiAgcHJpdmF0ZSB2aWV3SW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCdjYW52YXMnKVxuICBwcml2YXRlIGNhbnZhc1JlZjogRWxlbWVudFJlZjsgLy8gTk9URTogc2F5IGJ5ZS1ieWUgdG8gc2VydmVyLXNpZGUgcmVuZGVyaW5nIDspXG5cbiAgQENvbnRlbnRDaGlsZHJlbihTY2VuZURpcmVjdGl2ZSkgc2NlbmVDb21wb25lbnRzOiBRdWVyeUxpc3Q8U2NlbmVEaXJlY3RpdmU+OyAvLyBUT0RPOiBNdWx0aXBsZSBzY2VuZXNcbiAgQENvbnRlbnRDaGlsZHJlbihBYnN0cmFjdENhbWVyYSkgY2FtZXJhQ29tcG9uZW50czogUXVlcnlMaXN0PEFic3RyYWN0Q2FtZXJhPFRIUkVFLkNhbWVyYT4+OyAvLyBUT0RPOiBNdWx0aXBsZSBjYW1lcmFzXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50LmNvbnN0cnVjdG9yJyk7XG4gICAgdGhpcy5yZW5kZXIgPSB0aGlzLnJlbmRlci5iaW5kKHRoaXMpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5uZ0FmdGVyVmlld0luaXQnKTtcbiAgICB0aGlzLnZpZXdJbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy5zdGFydFJlbmRlcmluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByZW5kZXIgcGFuZSBvbiB3aGljaCB0aGUgc2NlbmUgaXMgcmVuZGVyZWQuXG4gICAqIEN1cnJlbnRseSwgb25seSB0aGUgV2ViR0wgcmVuZGVyZXIgd2l0aCBhIGNhbnZhcyBpcyB1c2VkIGluIHRoaXNcbiAgICogaW1wbGVtZW50YXRpb24sIHNvIHRoaXMgcHJvcGVydHkgd2lsbCBhbHdheXMgYmUgYW4gRWxlbWVudFJlZiB0byB0aGVcbiAgICogdW5kZXJseWluZyA8Y2FudmFzPiBlbGVtZW50LlxuICAgKlxuICAgKiBAZXhhbXBsZSBUaGlzIHByb3BlcnR5IGNhbiBiZSB1c2VkIHRvIHJlc3RyaWN0IHRoZSBvcmJpdCBjb250cm9scyAoaS5lLiB0aGVcbiAgICogYXJlYSB3aGljaCBpcyBsaXN0ZW5lZCBmb3IgbW91c2UgbW92ZSBhbmQgem9vbSBldmVudHMpIHRvIHRoZSByZW5kZXJpbmcgcGFuZTpcbiAgICogYGBgXG4gICAqIDx0aHJlZS1vcmJpdC1jb250cm9scyBbcm90YXRlU3BlZWRdPTEgW3pvb21TcGVlZF09MS4yIFtsaXN0ZW5pbmdDb250cm9sRWxlbWVudF09bWFpblJlbmRlcmVyLnJlbmRlclBhbmU+XG4gICAqICAgPHRocmVlLXJlbmRlcmVyICNtYWluUmVuZGVyZXI+XG4gICAqICAgICAuLi5cbiAgICogICA8L3RocmVlLXJlbmRlcmVyPlxuICAgKiA8L3RocmVlLW9yYml0LWNvbnRyb2xzPlxuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyBnZXQgcmVuZGVyUGFuZSgpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNSZWY7XG4gIH1cblxuICBwcml2YXRlIGdldCBjYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydFJlbmRlcmluZygpIHtcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQuc3RhcnRSZW5kZXJpbmcnKTtcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xuICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcbiAgICAgIGFudGlhbGlhczogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHRoaXMuY2FudmFzLmNsaWVudFdpZHRoLCB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5yZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXA7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKDB4ZmZmZmZmLCAxKTtcbiAgICB0aGlzLnJlbmRlcmVyLmF1dG9DbGVhciA9IHRydWU7XG5cbiAgICB0aGlzLnVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgLy8gaWYgKHRoaXMuc2NlbmVDb21wb25lbnRzICE9IHVuZGVmaW5lZCAmJiB0aGlzLnNjZW5lQ29tcG9uZW50cy5sZW5ndGggPT0gMSAmJlxuICAgIC8vICAgICB0aGlzLmNhbWVyYUNvbXBvbmVudHMgIT0gdW5kZWZpbmVkICYmIHRoaXMuY2FtZXJhQ29tcG9uZW50cy5sZW5ndGggPT0gMSkge1xuICAgIGlmICh0aGlzLnZpZXdJbml0aWFsaXplZCkge1xuICAgICAgY29uc3Qgc2NlbmVDb21wb25lbnQgPSB0aGlzLnNjZW5lQ29tcG9uZW50cy5maXJzdDtcbiAgICAgIGNvbnN0IGNhbWVyYUNvbXBvbmVudCA9IHRoaXMuY2FtZXJhQ29tcG9uZW50cy5maXJzdDtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVuZGVyXCIpO1xuICAgICAgLy8gY29uc29sZS5sb2coc2NlbmUuZ2V0T2JqZWN0KCkpO1xuICAgICAgLy8gY29uc29sZS5sb2coY2FtZXJhLmNhbWVyYSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihzY2VuZUNvbXBvbmVudC5nZXRPYmplY3QoKSwgY2FtZXJhQ29tcG9uZW50LmNhbWVyYSk7XG4gICAgfVxuICAgIC8vIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTogbnVtYmVyIHtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKGhlaWdodCA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCAvIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25SZXNpemUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgdGhpcy5jYW52YXMuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5vblJlc2l6ZTogJyArIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoICsgJywgJyArIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG5cbiAgICB0aGlzLnVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUodGhpcy5jYW52YXMuY2xpZW50V2lkdGgsIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVDaGlsZENhbWVyYXNBc3BlY3RSYXRpbygpIHtcbiAgICBjb25zdCBhc3BlY3QgPSB0aGlzLmNhbGN1bGF0ZUFzcGVjdFJhdGlvKCk7XG4gICAgdGhpcy5jYW1lcmFDb21wb25lbnRzLmZvckVhY2goY2FtZXJhID0+IGNhbWVyYS51cGRhdGVBc3BlY3RSYXRpbyhhc3BlY3QpKTtcbiAgfVxuXG4gIC8qXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleXByZXNzJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uS2V5UHJlc3MoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhcIm9uS2V5UHJlc3M6IFwiICsgZXZlbnQua2V5KTtcbiAgfVxuKi9cblxufVxuIl19