/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ContentChildren, Directive, ElementRef, Input, QueryList } from '@angular/core';
import * as THREE from 'three-full';
import { WebGLRendererComponent } from '../renderer/webgl-renderer.component';
import { AbstractCamera } from '../cameras/abstract-camera';
export class OrbitControlsDirective {
    constructor() {
        /**
         * The element on whose native element the orbit controls will listen for mouse events.
         *
         * Note that keyboard events are still listened for on the global window object, this is
         * a known issue from Three.js: https://github.com/mrdoob/three.js/pull/10315
         *
         * \@example This property can be used to restrict the orbit controls (i.e. the
         * area which is listened for mouse move and zoom events) to the rendering pane:
         * ```
         * <three-orbit-controls [listeningControlElement]=mainRenderer.renderPane>
         *   <three-renderer #mainRenderer>
         *     ...
         *   </three-renderer>
         * </three-orbit-controls>
         * ```
         */
        this.listeningControlElement = undefined;
        this.rotateSpeed = 1.0;
        this.zoomSpeed = 1.2;
        console.log('OrbitControlsDirective.constructor');
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // If the THREE.js OrbitControls are not set up yet, we do not need to update
        // anything as they will pick the new values from the @Input properties automatically
        // upon creation.
        if (!this.controls) {
            return;
        }
        if (changes['rotateSpeed']) {
            this.controls.rotateSpeed = this.rotateSpeed;
        }
        if (changes['zoomSpeed']) {
            this.controls.zoomSpeed = this.zoomSpeed;
        }
        if (changes['listeningControlElement']) {
            // The DOM element the OrbitControls listen on cannot be changed once an
            // OrbitControls object is created. We thus need to recreate it.
            this.controls.dispose();
            this.setUpOrbitControls();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.controls.dispose();
    }
    /**
     * @return {?}
     */
    setUpOrbitControls() {
        this.controls = new THREE.OrbitControls(this.childCameras.first.camera, this.listeningControlElement && this.listeningControlElement.nativeElement);
        this.controls.rotateSpeed = this.rotateSpeed;
        this.controls.zoomSpeed = this.zoomSpeed;
        this.controls.addEventListener('change', this.childRenderers.first.render);
        this.childRenderers.first.render();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        console.log('OrbitControlsDirective.ngAfterViewInit');
        if (this.childCameras === undefined || this.childCameras.first === undefined) {
            throw new Error('Camera is not found');
        }
        if (this.childRenderers === undefined || this.childRenderers.first === undefined) {
            throw new Error('Renderer is not found');
        }
        this.setUpOrbitControls();
    }
}
OrbitControlsDirective.decorators = [
    { type: Directive, args: [{
                selector: 'three-orbit-controls'
            },] },
];
/** @nocollapse */
OrbitControlsDirective.ctorParameters = () => [];
OrbitControlsDirective.propDecorators = {
    childCameras: [{ type: ContentChildren, args: [AbstractCamera, { descendants: true },] }],
    childRenderers: [{ type: ContentChildren, args: [WebGLRendererComponent, { descendants: true },] }],
    listeningControlElement: [{ type: Input }],
    rotateSpeed: [{ type: Input }],
    zoomSpeed: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    OrbitControlsDirective.prototype.childCameras;
    /** @type {?} */
    OrbitControlsDirective.prototype.childRenderers;
    /**
     * The element on whose native element the orbit controls will listen for mouse events.
     *
     * Note that keyboard events are still listened for on the global window object, this is
     * a known issue from Three.js: https://github.com/mrdoob/three.js/pull/10315
     *
     * \@example This property can be used to restrict the orbit controls (i.e. the
     * area which is listened for mouse move and zoom events) to the rendering pane:
     * ```
     * <three-orbit-controls [listeningControlElement]=mainRenderer.renderPane>
     *   <three-renderer #mainRenderer>
     *     ...
     *   </three-renderer>
     * </three-orbit-controls>
     * ```
     * @type {?}
     */
    OrbitControlsDirective.prototype.listeningControlElement;
    /** @type {?} */
    OrbitControlsDirective.prototype.rotateSpeed;
    /** @type {?} */
    OrbitControlsDirective.prototype.zoomSpeed;
    /** @type {?} */
    OrbitControlsDirective.prototype.controls;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JiaXQtY29udHJvbHMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2xzL29yYml0LWNvbnRyb2xzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQ3hDLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEtBQUssS0FBSyxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFLNUQsTUFBTTtJQTJCSjs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNBUDJELFNBQVM7MkJBRTdDLEdBQUc7eUJBQ0wsR0FBRztRQUt0QixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7S0FDbkQ7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCOzs7O1FBSWhDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE9BQU87U0FDUjtRQUVELElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDOUM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxPQUFPLENBQUMseUJBQXlCLENBQUMsRUFBRTs7O1lBR3RDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0I7S0FDRjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ3pCOzs7O0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQzlCLElBQUksQ0FBQyx1QkFBdUIsSUFBSSxJQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUMzRSxDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7OztJQUdyQyxlQUFlO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1FBQ3RELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQzVFLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ2hGLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUMxQztRQUVELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0tBQzNCOzs7WUFqRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7YUFDakM7Ozs7OzJCQUdFLGVBQWUsU0FBQyxjQUFjLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFOzZCQUNyRCxlQUFlLFNBQUMsc0JBQXNCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO3NDQWlCN0QsS0FBSzswQkFFTCxLQUFLO3dCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcyxcbiAgIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlcywgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IFdlYkdMUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuLi9yZW5kZXJlci93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWJzdHJhY3RDYW1lcmEgfSBmcm9tICcuLi9jYW1lcmFzL2Fic3RyYWN0LWNhbWVyYSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLW9yYml0LWNvbnRyb2xzJ1xufSlcbmV4cG9ydCBjbGFzcyBPcmJpdENvbnRyb2xzRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQWJzdHJhY3RDYW1lcmEsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgY2hpbGRDYW1lcmFzOiBRdWVyeUxpc3Q8QWJzdHJhY3RDYW1lcmE8VEhSRUUuQ2FtZXJhPj47XG4gIEBDb250ZW50Q2hpbGRyZW4oV2ViR0xSZW5kZXJlckNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBjaGlsZFJlbmRlcmVyczogUXVlcnlMaXN0PFdlYkdMUmVuZGVyZXJDb21wb25lbnQ+O1xuICAvKipcbiAgICogVGhlIGVsZW1lbnQgb24gd2hvc2UgbmF0aXZlIGVsZW1lbnQgdGhlIG9yYml0IGNvbnRyb2xzIHdpbGwgbGlzdGVuIGZvciBtb3VzZSBldmVudHMuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBrZXlib2FyZCBldmVudHMgYXJlIHN0aWxsIGxpc3RlbmVkIGZvciBvbiB0aGUgZ2xvYmFsIHdpbmRvdyBvYmplY3QsIHRoaXMgaXNcbiAgICogYSBrbm93biBpc3N1ZSBmcm9tIFRocmVlLmpzOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMTAzMTVcbiAgICpcbiAgICogQGV4YW1wbGUgVGhpcyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCB0byByZXN0cmljdCB0aGUgb3JiaXQgY29udHJvbHMgKGkuZS4gdGhlXG4gICAqIGFyZWEgd2hpY2ggaXMgbGlzdGVuZWQgZm9yIG1vdXNlIG1vdmUgYW5kIHpvb20gZXZlbnRzKSB0byB0aGUgcmVuZGVyaW5nIHBhbmU6XG4gICAqIGBgYFxuICAgKiA8dGhyZWUtb3JiaXQtY29udHJvbHMgW2xpc3RlbmluZ0NvbnRyb2xFbGVtZW50XT1tYWluUmVuZGVyZXIucmVuZGVyUGFuZT5cbiAgICogICA8dGhyZWUtcmVuZGVyZXIgI21haW5SZW5kZXJlcj5cbiAgICogICAgIC4uLlxuICAgKiAgIDwvdGhyZWUtcmVuZGVyZXI+XG4gICAqIDwvdGhyZWUtb3JiaXQtY29udHJvbHM+XG4gICAqIGBgYFxuICAgKi9cbiAgQElucHV0KCkgbGlzdGVuaW5nQ29udHJvbEVsZW1lbnQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgQElucHV0KCkgcm90YXRlU3BlZWQgPSAxLjA7XG4gIEBJbnB1dCgpIHpvb21TcGVlZCA9IDEuMjtcblxuICBwcml2YXRlIGNvbnRyb2xzOiBUSFJFRS5PcmJpdENvbnRyb2xzO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdPcmJpdENvbnRyb2xzRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgLy8gSWYgdGhlIFRIUkVFLmpzIE9yYml0Q29udHJvbHMgYXJlIG5vdCBzZXQgdXAgeWV0LCB3ZSBkbyBub3QgbmVlZCB0byB1cGRhdGVcbiAgICAvLyBhbnl0aGluZyBhcyB0aGV5IHdpbGwgcGljayB0aGUgbmV3IHZhbHVlcyBmcm9tIHRoZSBASW5wdXQgcHJvcGVydGllcyBhdXRvbWF0aWNhbGx5XG4gICAgLy8gdXBvbiBjcmVhdGlvbi5cbiAgICBpZiAoIXRoaXMuY29udHJvbHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1sncm90YXRlU3BlZWQnXSkge1xuICAgICAgdGhpcy5jb250cm9scy5yb3RhdGVTcGVlZCA9IHRoaXMucm90YXRlU3BlZWQ7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd6b29tU3BlZWQnXSkge1xuICAgICAgdGhpcy5jb250cm9scy56b29tU3BlZWQgPSB0aGlzLnpvb21TcGVlZDtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2xpc3RlbmluZ0NvbnRyb2xFbGVtZW50J10pIHtcbiAgICAgIC8vIFRoZSBET00gZWxlbWVudCB0aGUgT3JiaXRDb250cm9scyBsaXN0ZW4gb24gY2Fubm90IGJlIGNoYW5nZWQgb25jZSBhblxuICAgICAgLy8gT3JiaXRDb250cm9scyBvYmplY3QgaXMgY3JlYXRlZC4gV2UgdGh1cyBuZWVkIHRvIHJlY3JlYXRlIGl0LlxuICAgICAgdGhpcy5jb250cm9scy5kaXNwb3NlKCk7XG4gICAgICB0aGlzLnNldFVwT3JiaXRDb250cm9scygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY29udHJvbHMuZGlzcG9zZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRVcE9yYml0Q29udHJvbHMoKSB7XG4gICAgdGhpcy5jb250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKFxuICAgICAgdGhpcy5jaGlsZENhbWVyYXMuZmlyc3QuY2FtZXJhLFxuICAgICAgdGhpcy5saXN0ZW5pbmdDb250cm9sRWxlbWVudCAmJiB0aGlzLmxpc3RlbmluZ0NvbnRyb2xFbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICApO1xuICAgIHRoaXMuY29udHJvbHMucm90YXRlU3BlZWQgPSB0aGlzLnJvdGF0ZVNwZWVkO1xuICAgIHRoaXMuY29udHJvbHMuem9vbVNwZWVkID0gdGhpcy56b29tU3BlZWQ7XG4gICAgdGhpcy5jb250cm9scy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoaWxkUmVuZGVyZXJzLmZpcnN0LnJlbmRlcik7XG4gICAgdGhpcy5jaGlsZFJlbmRlcmVycy5maXJzdC5yZW5kZXIoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnT3JiaXRDb250cm9sc0RpcmVjdGl2ZS5uZ0FmdGVyVmlld0luaXQnKTtcbiAgICBpZiAodGhpcy5jaGlsZENhbWVyYXMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmNoaWxkQ2FtZXJhcy5maXJzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbWVyYSBpcyBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2hpbGRSZW5kZXJlcnMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmNoaWxkUmVuZGVyZXJzLmZpcnN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVuZGVyZXIgaXMgbm90IGZvdW5kJyk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRVcE9yYml0Q29udHJvbHMoKTtcbiAgfVxuXG59XG4iXX0=