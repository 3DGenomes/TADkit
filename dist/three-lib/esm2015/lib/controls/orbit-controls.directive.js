/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ContentChildren, Directive, ElementRef, Input, QueryList } from '@angular/core';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
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
         * @example This property can be used to restrict the orbit controls (i.e. the
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
        // this.controls = new THREE.OrbitControls(
        this.controls = new OrbitControls(this.childCameras.first.camera, this.listeningControlElement && this.listeningControlElement.nativeElement);
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
            },] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JiaXQtY29udHJvbHMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2xzL29yYml0LWNvbnRyb2xzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQ3hDLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSzVELE1BQU07SUE0Qko7UUF4QkE7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ00sNEJBQXVCLEdBQTJCLFNBQVMsQ0FBQztRQUU1RCxnQkFBVyxHQUFHLEdBQUcsQ0FBQztRQUNsQixjQUFTLEdBQUcsR0FBRyxDQUFDO1FBTXZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyw2RUFBNkU7UUFDN0UscUZBQXFGO1FBQ3JGLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixPQUFPO1NBQ1I7UUFFRCxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUMxQztRQUNELElBQUksT0FBTyxDQUFDLHlCQUF5QixDQUFDLEVBQUU7WUFDdEMsd0VBQXdFO1lBQ3hFLGdFQUFnRTtZQUNoRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFTyxrQkFBa0I7UUFDeEIsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDaEMsSUFBSSxDQUFDLHVCQUF1QixJQUFJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQzNFLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDckMsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7UUFDdEQsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDNUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDaEYsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQzFDO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQzs7O1lBbkZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2FBQ2pDOzs7OzJCQUdFLGVBQWUsU0FBQyxjQUFjLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFOzZCQUNyRCxlQUFlLFNBQUMsc0JBQXNCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO3NDQWlCN0QsS0FBSzswQkFFTCxLQUFLO3dCQUNMLEtBQUs7Ozs7SUFyQk4sOENBQThHOztJQUM5RyxnREFBa0g7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWlCbEgseURBQXFFOztJQUVyRSw2Q0FBMkI7O0lBQzNCLDJDQUF5Qjs7SUFHekIsMENBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsXG4gICBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXMsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAnQGF2YXRzYWV2L3RocmVlLW9yYml0Y29udHJvbHMtdHMnO1xuaW1wb3J0IHsgV2ViR0xSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4uL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBYnN0cmFjdENhbWVyYSB9IGZyb20gJy4uL2NhbWVyYXMvYWJzdHJhY3QtY2FtZXJhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtb3JiaXQtY29udHJvbHMnXG59KVxuZXhwb3J0IGNsYXNzIE9yYml0Q29udHJvbHNEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihBYnN0cmFjdENhbWVyYSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBjaGlsZENhbWVyYXM6IFF1ZXJ5TGlzdDxBYnN0cmFjdENhbWVyYTxUSFJFRS5DYW1lcmE+PjtcbiAgQENvbnRlbnRDaGlsZHJlbihXZWJHTFJlbmRlcmVyQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGNoaWxkUmVuZGVyZXJzOiBRdWVyeUxpc3Q8V2ViR0xSZW5kZXJlckNvbXBvbmVudD47XG4gIC8qKlxuICAgKiBUaGUgZWxlbWVudCBvbiB3aG9zZSBuYXRpdmUgZWxlbWVudCB0aGUgb3JiaXQgY29udHJvbHMgd2lsbCBsaXN0ZW4gZm9yIG1vdXNlIGV2ZW50cy5cbiAgICpcbiAgICogTm90ZSB0aGF0IGtleWJvYXJkIGV2ZW50cyBhcmUgc3RpbGwgbGlzdGVuZWQgZm9yIG9uIHRoZSBnbG9iYWwgd2luZG93IG9iamVjdCwgdGhpcyBpc1xuICAgKiBhIGtub3duIGlzc3VlIGZyb20gVGhyZWUuanM6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8xMDMxNVxuICAgKlxuICAgKiBAZXhhbXBsZSBUaGlzIHByb3BlcnR5IGNhbiBiZSB1c2VkIHRvIHJlc3RyaWN0IHRoZSBvcmJpdCBjb250cm9scyAoaS5lLiB0aGVcbiAgICogYXJlYSB3aGljaCBpcyBsaXN0ZW5lZCBmb3IgbW91c2UgbW92ZSBhbmQgem9vbSBldmVudHMpIHRvIHRoZSByZW5kZXJpbmcgcGFuZTpcbiAgICogYGBgXG4gICAqIDx0aHJlZS1vcmJpdC1jb250cm9scyBbbGlzdGVuaW5nQ29udHJvbEVsZW1lbnRdPW1haW5SZW5kZXJlci5yZW5kZXJQYW5lPlxuICAgKiAgIDx0aHJlZS1yZW5kZXJlciAjbWFpblJlbmRlcmVyPlxuICAgKiAgICAgLi4uXG4gICAqICAgPC90aHJlZS1yZW5kZXJlcj5cbiAgICogPC90aHJlZS1vcmJpdC1jb250cm9scz5cbiAgICogYGBgXG4gICAqL1xuICBASW5wdXQoKSBsaXN0ZW5pbmdDb250cm9sRWxlbWVudDogRWxlbWVudFJlZiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICBASW5wdXQoKSByb3RhdGVTcGVlZCA9IDEuMDtcbiAgQElucHV0KCkgem9vbVNwZWVkID0gMS4yO1xuXG4gIC8vIHByaXZhdGUgY29udHJvbHM6IFRIUkVFLk9yYml0Q29udHJvbHM7XG4gIHByaXZhdGUgY29udHJvbHM6IE9yYml0Q29udHJvbHM7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ09yYml0Q29udHJvbHNEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAvLyBJZiB0aGUgVEhSRUUuanMgT3JiaXRDb250cm9scyBhcmUgbm90IHNldCB1cCB5ZXQsIHdlIGRvIG5vdCBuZWVkIHRvIHVwZGF0ZVxuICAgIC8vIGFueXRoaW5nIGFzIHRoZXkgd2lsbCBwaWNrIHRoZSBuZXcgdmFsdWVzIGZyb20gdGhlIEBJbnB1dCBwcm9wZXJ0aWVzIGF1dG9tYXRpY2FsbHlcbiAgICAvLyB1cG9uIGNyZWF0aW9uLlxuICAgIGlmICghdGhpcy5jb250cm9scykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydyb3RhdGVTcGVlZCddKSB7XG4gICAgICB0aGlzLmNvbnRyb2xzLnJvdGF0ZVNwZWVkID0gdGhpcy5yb3RhdGVTcGVlZDtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3pvb21TcGVlZCddKSB7XG4gICAgICB0aGlzLmNvbnRyb2xzLnpvb21TcGVlZCA9IHRoaXMuem9vbVNwZWVkO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbGlzdGVuaW5nQ29udHJvbEVsZW1lbnQnXSkge1xuICAgICAgLy8gVGhlIERPTSBlbGVtZW50IHRoZSBPcmJpdENvbnRyb2xzIGxpc3RlbiBvbiBjYW5ub3QgYmUgY2hhbmdlZCBvbmNlIGFuXG4gICAgICAvLyBPcmJpdENvbnRyb2xzIG9iamVjdCBpcyBjcmVhdGVkLiBXZSB0aHVzIG5lZWQgdG8gcmVjcmVhdGUgaXQuXG4gICAgICB0aGlzLmNvbnRyb2xzLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuc2V0VXBPcmJpdENvbnRyb2xzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jb250cm9scy5kaXNwb3NlKCk7XG4gIH1cblxuICBwcml2YXRlIHNldFVwT3JiaXRDb250cm9scygpIHtcbiAgICAvLyB0aGlzLmNvbnRyb2xzID0gbmV3IFRIUkVFLk9yYml0Q29udHJvbHMoXG4gICAgdGhpcy5jb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKFxuICAgICAgICB0aGlzLmNoaWxkQ2FtZXJhcy5maXJzdC5jYW1lcmEsXG4gICAgICB0aGlzLmxpc3RlbmluZ0NvbnRyb2xFbGVtZW50ICYmIHRoaXMubGlzdGVuaW5nQ29udHJvbEVsZW1lbnQubmF0aXZlRWxlbWVudFxuICAgICk7XG4gICAgdGhpcy5jb250cm9scy5yb3RhdGVTcGVlZCA9IHRoaXMucm90YXRlU3BlZWQ7XG4gICAgdGhpcy5jb250cm9scy56b29tU3BlZWQgPSB0aGlzLnpvb21TcGVlZDtcbiAgICB0aGlzLmNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hpbGRSZW5kZXJlcnMuZmlyc3QucmVuZGVyKTtcbiAgICB0aGlzLmNoaWxkUmVuZGVyZXJzLmZpcnN0LnJlbmRlcigpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdPcmJpdENvbnRyb2xzRGlyZWN0aXZlLm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIGlmICh0aGlzLmNoaWxkQ2FtZXJhcyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY2hpbGRDYW1lcmFzLmZpcnN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FtZXJhIGlzIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jaGlsZFJlbmRlcmVycyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY2hpbGRSZW5kZXJlcnMuZmlyc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZW5kZXJlciBpcyBub3QgZm91bmQnKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFVwT3JiaXRDb250cm9scygpO1xuICB9XG5cbn1cbiJdfQ==