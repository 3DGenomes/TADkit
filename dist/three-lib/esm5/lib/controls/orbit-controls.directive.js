/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ContentChildren, Directive, ElementRef, Input, QueryList } from '@angular/core';
import * as THREE from 'three-full';
import { WebGLRendererComponent } from '../renderer/webgl-renderer.component';
import { AbstractCamera } from '../cameras/abstract-camera';
var OrbitControlsDirective = /** @class */ (function () {
    function OrbitControlsDirective() {
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
    OrbitControlsDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
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
    };
    /**
     * @return {?}
     */
    OrbitControlsDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.controls.dispose();
    };
    /**
     * @return {?}
     */
    OrbitControlsDirective.prototype.setUpOrbitControls = /**
     * @return {?}
     */
    function () {
        this.controls = new THREE.OrbitControls(this.childCameras.first.camera, this.listeningControlElement && this.listeningControlElement.nativeElement);
        this.controls.rotateSpeed = this.rotateSpeed;
        this.controls.zoomSpeed = this.zoomSpeed;
        this.controls.addEventListener('change', this.childRenderers.first.render);
        this.childRenderers.first.render();
    };
    /**
     * @return {?}
     */
    OrbitControlsDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        console.log('OrbitControlsDirective.ngAfterViewInit');
        if (this.childCameras === undefined || this.childCameras.first === undefined) {
            throw new Error('Camera is not found');
        }
        if (this.childRenderers === undefined || this.childRenderers.first === undefined) {
            throw new Error('Renderer is not found');
        }
        this.setUpOrbitControls();
    };
    OrbitControlsDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'three-orbit-controls'
                },] },
    ];
    /** @nocollapse */
    OrbitControlsDirective.ctorParameters = function () { return []; };
    OrbitControlsDirective.propDecorators = {
        childCameras: [{ type: ContentChildren, args: [AbstractCamera, { descendants: true },] }],
        childRenderers: [{ type: ContentChildren, args: [WebGLRendererComponent, { descendants: true },] }],
        listeningControlElement: [{ type: Input }],
        rotateSpeed: [{ type: Input }],
        zoomSpeed: [{ type: Input }]
    };
    return OrbitControlsDirective;
}());
export { OrbitControlsDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JiaXQtY29udHJvbHMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2xzL29yYml0LWNvbnRyb2xzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQ3hDLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEtBQUssS0FBSyxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBZ0MxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNBUDJELFNBQVM7MkJBRTdDLEdBQUc7eUJBQ0wsR0FBRztRQUt0QixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7S0FDbkQ7Ozs7O0lBRUQsNENBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCOzs7O1FBSWhDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE9BQU87U0FDUjtRQUVELElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDOUM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxPQUFPLENBQUMseUJBQXlCLENBQUMsRUFBRTs7O1lBR3RDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0I7S0FDRjs7OztJQUVELDRDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDekI7Ozs7SUFFTyxtREFBa0I7Ozs7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDOUIsSUFBSSxDQUFDLHVCQUF1QixJQUFJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQzNFLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7O0lBR3JDLGdEQUFlOzs7SUFBZjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQztRQUN0RCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUM1RSxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDeEM7UUFDRCxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUNoRixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDMUM7UUFFRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztLQUMzQjs7Z0JBakZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2lCQUNqQzs7Ozs7K0JBR0UsZUFBZSxTQUFDLGNBQWMsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7aUNBQ3JELGVBQWUsU0FBQyxzQkFBc0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7MENBaUI3RCxLQUFLOzhCQUVMLEtBQUs7NEJBQ0wsS0FBSzs7aUNBaENSOztTQVNhLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLFxuICAgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgV2ViR0xSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4uL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBYnN0cmFjdENhbWVyYSB9IGZyb20gJy4uL2NhbWVyYXMvYWJzdHJhY3QtY2FtZXJhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtb3JiaXQtY29udHJvbHMnXG59KVxuZXhwb3J0IGNsYXNzIE9yYml0Q29udHJvbHNEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihBYnN0cmFjdENhbWVyYSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBjaGlsZENhbWVyYXM6IFF1ZXJ5TGlzdDxBYnN0cmFjdENhbWVyYTxUSFJFRS5DYW1lcmE+PjtcbiAgQENvbnRlbnRDaGlsZHJlbihXZWJHTFJlbmRlcmVyQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGNoaWxkUmVuZGVyZXJzOiBRdWVyeUxpc3Q8V2ViR0xSZW5kZXJlckNvbXBvbmVudD47XG4gIC8qKlxuICAgKiBUaGUgZWxlbWVudCBvbiB3aG9zZSBuYXRpdmUgZWxlbWVudCB0aGUgb3JiaXQgY29udHJvbHMgd2lsbCBsaXN0ZW4gZm9yIG1vdXNlIGV2ZW50cy5cbiAgICpcbiAgICogTm90ZSB0aGF0IGtleWJvYXJkIGV2ZW50cyBhcmUgc3RpbGwgbGlzdGVuZWQgZm9yIG9uIHRoZSBnbG9iYWwgd2luZG93IG9iamVjdCwgdGhpcyBpc1xuICAgKiBhIGtub3duIGlzc3VlIGZyb20gVGhyZWUuanM6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8xMDMxNVxuICAgKlxuICAgKiBAZXhhbXBsZSBUaGlzIHByb3BlcnR5IGNhbiBiZSB1c2VkIHRvIHJlc3RyaWN0IHRoZSBvcmJpdCBjb250cm9scyAoaS5lLiB0aGVcbiAgICogYXJlYSB3aGljaCBpcyBsaXN0ZW5lZCBmb3IgbW91c2UgbW92ZSBhbmQgem9vbSBldmVudHMpIHRvIHRoZSByZW5kZXJpbmcgcGFuZTpcbiAgICogYGBgXG4gICAqIDx0aHJlZS1vcmJpdC1jb250cm9scyBbbGlzdGVuaW5nQ29udHJvbEVsZW1lbnRdPW1haW5SZW5kZXJlci5yZW5kZXJQYW5lPlxuICAgKiAgIDx0aHJlZS1yZW5kZXJlciAjbWFpblJlbmRlcmVyPlxuICAgKiAgICAgLi4uXG4gICAqICAgPC90aHJlZS1yZW5kZXJlcj5cbiAgICogPC90aHJlZS1vcmJpdC1jb250cm9scz5cbiAgICogYGBgXG4gICAqL1xuICBASW5wdXQoKSBsaXN0ZW5pbmdDb250cm9sRWxlbWVudDogRWxlbWVudFJlZiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICBASW5wdXQoKSByb3RhdGVTcGVlZCA9IDEuMDtcbiAgQElucHV0KCkgem9vbVNwZWVkID0gMS4yO1xuXG4gIHByaXZhdGUgY29udHJvbHM6IFRIUkVFLk9yYml0Q29udHJvbHM7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ09yYml0Q29udHJvbHNEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAvLyBJZiB0aGUgVEhSRUUuanMgT3JiaXRDb250cm9scyBhcmUgbm90IHNldCB1cCB5ZXQsIHdlIGRvIG5vdCBuZWVkIHRvIHVwZGF0ZVxuICAgIC8vIGFueXRoaW5nIGFzIHRoZXkgd2lsbCBwaWNrIHRoZSBuZXcgdmFsdWVzIGZyb20gdGhlIEBJbnB1dCBwcm9wZXJ0aWVzIGF1dG9tYXRpY2FsbHlcbiAgICAvLyB1cG9uIGNyZWF0aW9uLlxuICAgIGlmICghdGhpcy5jb250cm9scykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydyb3RhdGVTcGVlZCddKSB7XG4gICAgICB0aGlzLmNvbnRyb2xzLnJvdGF0ZVNwZWVkID0gdGhpcy5yb3RhdGVTcGVlZDtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3pvb21TcGVlZCddKSB7XG4gICAgICB0aGlzLmNvbnRyb2xzLnpvb21TcGVlZCA9IHRoaXMuem9vbVNwZWVkO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbGlzdGVuaW5nQ29udHJvbEVsZW1lbnQnXSkge1xuICAgICAgLy8gVGhlIERPTSBlbGVtZW50IHRoZSBPcmJpdENvbnRyb2xzIGxpc3RlbiBvbiBjYW5ub3QgYmUgY2hhbmdlZCBvbmNlIGFuXG4gICAgICAvLyBPcmJpdENvbnRyb2xzIG9iamVjdCBpcyBjcmVhdGVkLiBXZSB0aHVzIG5lZWQgdG8gcmVjcmVhdGUgaXQuXG4gICAgICB0aGlzLmNvbnRyb2xzLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuc2V0VXBPcmJpdENvbnRyb2xzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jb250cm9scy5kaXNwb3NlKCk7XG4gIH1cblxuICBwcml2YXRlIHNldFVwT3JiaXRDb250cm9scygpIHtcbiAgICB0aGlzLmNvbnRyb2xzID0gbmV3IFRIUkVFLk9yYml0Q29udHJvbHMoXG4gICAgICB0aGlzLmNoaWxkQ2FtZXJhcy5maXJzdC5jYW1lcmEsXG4gICAgICB0aGlzLmxpc3RlbmluZ0NvbnRyb2xFbGVtZW50ICYmIHRoaXMubGlzdGVuaW5nQ29udHJvbEVsZW1lbnQubmF0aXZlRWxlbWVudFxuICAgICk7XG4gICAgdGhpcy5jb250cm9scy5yb3RhdGVTcGVlZCA9IHRoaXMucm90YXRlU3BlZWQ7XG4gICAgdGhpcy5jb250cm9scy56b29tU3BlZWQgPSB0aGlzLnpvb21TcGVlZDtcbiAgICB0aGlzLmNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hpbGRSZW5kZXJlcnMuZmlyc3QucmVuZGVyKTtcbiAgICB0aGlzLmNoaWxkUmVuZGVyZXJzLmZpcnN0LnJlbmRlcigpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdPcmJpdENvbnRyb2xzRGlyZWN0aXZlLm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIGlmICh0aGlzLmNoaWxkQ2FtZXJhcyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY2hpbGRDYW1lcmFzLmZpcnN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FtZXJhIGlzIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jaGlsZFJlbmRlcmVycyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY2hpbGRSZW5kZXJlcnMuZmlyc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZW5kZXJlciBpcyBub3QgZm91bmQnKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFVwT3JiaXRDb250cm9scygpO1xuICB9XG5cbn1cbiJdfQ==