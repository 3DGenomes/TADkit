/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Input } from '@angular/core';
import { AbstractObject3D } from '../abstract-object-3d';
import { WebGLRendererComponent } from '../../renderer/webgl-renderer.component';
import * as THREE from 'three-full';
/**
 * Helper parent class for model loader directives.
 *
 * @see ObjectLoaderDirective
 * @see ObjLoaderDirective
 * @see ColladaLoaderDirective
 * @abstract
 */
export class AbstractModelLoader extends AbstractObject3D {
    constructor() {
        super(...arguments);
        /**
         * Flag to signal whether the parent class instance AbstractObject3D called the
         * overwritten method {\@link ModelLoaderDirective#afterInit} yet.
         *
         * Unless that method was called, no methods and properties of {\@link AbstractObject3D}
         * may be safely accessed, especially {\@link AbstractObject3D#addChild} and
         * {\@link AbstractObject3D.renderer}.
         */
        this.parentInitialized = false;
    }
    /**
     * The model data source (usually a URI).
     * Settings this property only hides the previous model upon successful
     * loading of the new one. This especially means that if the new data source
     * is invalid, the old model will *not* be removed from the scene.
     * @param {?} newModelUrl
     * @return {?}
     */
    set model(newModelUrl) {
        this._model = newModelUrl;
        // Delay model loading until the parent has been initialized,
        // so that we can call addChild().
        if (!this.parentInitialized) {
            return;
        }
        this.loadModelObject().then(newModel => {
            if (this.currentLoadedModelObject) {
                this.removeChild(this.currentLoadedModelObject);
            }
            this.currentLoadedModelObject = newModel;
            this.addChild(newModel);
            if (this.renderer) {
                this.renderer.render();
            }
        }).catch(err => {
            console.error(err);
        });
    }
    /**
     * The current model data source (usually a URI).
     * @return {?}
     */
    get model() {
        return this._model;
    }
    /**
     * @param {?} newRenderer
     * @return {?}
     */
    set renderer(newRenderer) {
        this._renderer = newRenderer;
        this._renderer.render();
    }
    /**
     * @return {?}
     */
    get renderer() {
        return this._renderer;
    }
    /**
     * @return {?}
     */
    afterInit() {
        this.parentInitialized = true;
        // Trigger model acquisition now that the parent has been initialized.
        this.model = this.model;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.currentLoadedModelObject) {
            this.removeChild(this.currentLoadedModelObject);
        }
    }
    /**
     * @return {?}
     */
    rerender() {
        super.rerender();
        if (this.renderer) {
            this.renderer.render();
        }
    }
    /**
     * @return {?}
     */
    newObject3DInstance() {
        return new THREE.Object3D();
    }
}
AbstractModelLoader.propDecorators = {
    model: [{ type: Input }],
    renderer: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AbstractModelLoader.prototype._model;
    /** @type {?} */
    AbstractModelLoader.prototype._renderer;
    /**
     * Flag to signal whether the parent class instance AbstractObject3D called the
     * overwritten method {\@link ModelLoaderDirective#afterInit} yet.
     *
     * Unless that method was called, no methods and properties of {\@link AbstractObject3D}
     * may be safely accessed, especially {\@link AbstractObject3D#addChild} and
     * {\@link AbstractObject3D.renderer}.
     * @type {?}
     */
    AbstractModelLoader.prototype.parentInitialized;
    /** @type {?} */
    AbstractModelLoader.prototype.currentLoadedModelObject;
    /**
     * Load the model object.
     *
     * Some loaders (e.g. ColladaLoader) also provide other model information
     * upon loading besides the "raw" model object/scene. In these cases
     * implementing child classes are indeed supposed to return the "raw" model
     * object.
     * The data source (usually a URI, although child classes are free to implement
     * other means as well) from which the model shall be loaded can be obtained by
     * {\@link ModelLoaderDirective.model}.
     * @abstract
     * @return {?}
     */
    AbstractModelLoader.prototype.loadModelObject = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtbW9kZWwtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL29iamVjdHMvbG9hZGVycy9hYnN0cmFjdC1tb2RlbC1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBNkIsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pGLE9BQU8sS0FBSyxLQUFLLE1BQU0sWUFBWSxDQUFDOzs7Ozs7Ozs7QUFTcEMsTUFBTSwwQkFBb0MsU0FBUSxnQkFBZ0M7Ozs7Ozs7Ozs7O2lDQWFwRCxLQUFLOzs7Ozs7Ozs7O0lBdUJqQyxJQUNXLEtBQUssQ0FBQyxXQUFtQjtRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQzs7O1FBSTFCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNyQyxJQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUNqRDtZQUVELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxRQUFRLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV4QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDeEI7U0FDRixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQixDQUFDLENBQUM7S0FDSjs7Ozs7UUFLVSxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7Ozs7SUFHckIsSUFDVyxRQUFRLENBQUMsV0FBbUM7UUFDckQsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN6Qjs7OztRQUVVLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7OztJQUdkLFNBQVM7UUFDakIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQzs7UUFHOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ3pCOzs7O0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLHdCQUF3QixFQUFFO1lBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7U0FDakQ7S0FDRjs7OztJQUVTLFFBQVE7UUFDaEIsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWpCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7SUFFUyxtQkFBbUI7UUFDM0IsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM3Qjs7O29CQWxFQSxLQUFLO3VCQWlDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vcmVuZGVyZXIvd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG4vKipcbiAqIEhlbHBlciBwYXJlbnQgY2xhc3MgZm9yIG1vZGVsIGxvYWRlciBkaXJlY3RpdmVzLlxuICpcbiAqIEBzZWUgT2JqZWN0TG9hZGVyRGlyZWN0aXZlXG4gKiBAc2VlIE9iakxvYWRlckRpcmVjdGl2ZVxuICogQHNlZSBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdE1vZGVsTG9hZGVyIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5PYmplY3QzRD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX21vZGVsOiBzdHJpbmc7XG4gIHByaXZhdGUgX3JlbmRlcmVyOiBXZWJHTFJlbmRlcmVyQ29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBGbGFnIHRvIHNpZ25hbCB3aGV0aGVyIHRoZSBwYXJlbnQgY2xhc3MgaW5zdGFuY2UgQWJzdHJhY3RPYmplY3QzRCBjYWxsZWQgdGhlXG4gICAqIG92ZXJ3cml0dGVuIG1ldGhvZCB7QGxpbmsgTW9kZWxMb2FkZXJEaXJlY3RpdmUjYWZ0ZXJJbml0fSB5ZXQuXG4gICAqXG4gICAqIFVubGVzcyB0aGF0IG1ldGhvZCB3YXMgY2FsbGVkLCBubyBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIG9mIHtAbGluayBBYnN0cmFjdE9iamVjdDNEfVxuICAgKiBtYXkgYmUgc2FmZWx5IGFjY2Vzc2VkLCBlc3BlY2lhbGx5IHtAbGluayBBYnN0cmFjdE9iamVjdDNEI2FkZENoaWxkfSBhbmRcbiAgICoge0BsaW5rIEFic3RyYWN0T2JqZWN0M0QucmVuZGVyZXJ9LlxuICAgKi9cbiAgcHJpdmF0ZSBwYXJlbnRJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBjdXJyZW50TG9hZGVkTW9kZWxPYmplY3Q6IFRIUkVFLk9iamVjdDNEIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBMb2FkIHRoZSBtb2RlbCBvYmplY3QuXG4gICAqXG4gICAqIFNvbWUgbG9hZGVycyAoZS5nLiBDb2xsYWRhTG9hZGVyKSBhbHNvIHByb3ZpZGUgb3RoZXIgbW9kZWwgaW5mb3JtYXRpb25cbiAgICogdXBvbiBsb2FkaW5nIGJlc2lkZXMgdGhlIFwicmF3XCIgbW9kZWwgb2JqZWN0L3NjZW5lLiBJbiB0aGVzZSBjYXNlc1xuICAgKiBpbXBsZW1lbnRpbmcgY2hpbGQgY2xhc3NlcyBhcmUgaW5kZWVkIHN1cHBvc2VkIHRvIHJldHVybiB0aGUgXCJyYXdcIiBtb2RlbFxuICAgKiBvYmplY3QuXG4gICAqIFRoZSBkYXRhIHNvdXJjZSAodXN1YWxseSBhIFVSSSwgYWx0aG91Z2ggY2hpbGQgY2xhc3NlcyBhcmUgZnJlZSB0byBpbXBsZW1lbnRcbiAgICogb3RoZXIgbWVhbnMgYXMgd2VsbCkgZnJvbSB3aGljaCB0aGUgbW9kZWwgc2hhbGwgYmUgbG9hZGVkIGNhbiBiZSBvYnRhaW5lZCBieVxuICAgKiB7QGxpbmsgTW9kZWxMb2FkZXJEaXJlY3RpdmUubW9kZWx9LlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGFzeW5jIGxvYWRNb2RlbE9iamVjdCgpOiBQcm9taXNlPFRIUkVFLk9iamVjdDNEPjtcblxuICAvKipcbiAgICogVGhlIG1vZGVsIGRhdGEgc291cmNlICh1c3VhbGx5IGEgVVJJKS5cbiAgICogU2V0dGluZ3MgdGhpcyBwcm9wZXJ0eSBvbmx5IGhpZGVzIHRoZSBwcmV2aW91cyBtb2RlbCB1cG9uIHN1Y2Nlc3NmdWxcbiAgICogbG9hZGluZyBvZiB0aGUgbmV3IG9uZS4gVGhpcyBlc3BlY2lhbGx5IG1lYW5zIHRoYXQgaWYgdGhlIG5ldyBkYXRhIHNvdXJjZVxuICAgKiBpcyBpbnZhbGlkLCB0aGUgb2xkIG1vZGVsIHdpbGwgKm5vdCogYmUgcmVtb3ZlZCBmcm9tIHRoZSBzY2VuZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbW9kZWwobmV3TW9kZWxVcmw6IHN0cmluZykge1xuICAgIHRoaXMuX21vZGVsID0gbmV3TW9kZWxVcmw7XG5cbiAgICAvLyBEZWxheSBtb2RlbCBsb2FkaW5nIHVudGlsIHRoZSBwYXJlbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQsXG4gICAgLy8gc28gdGhhdCB3ZSBjYW4gY2FsbCBhZGRDaGlsZCgpLlxuICAgIGlmICghdGhpcy5wYXJlbnRJbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubG9hZE1vZGVsT2JqZWN0KCkudGhlbihuZXdNb2RlbCA9PiB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0ID0gbmV3TW9kZWw7XG4gICAgICB0aGlzLmFkZENoaWxkKG5ld01vZGVsKTtcblxuICAgICAgaWYgKHRoaXMucmVuZGVyZXIpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoKTtcbiAgICAgIH1cbiAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IG1vZGVsIGRhdGEgc291cmNlICh1c3VhbGx5IGEgVVJJKS5cbiAgICovXG4gIHB1YmxpYyBnZXQgbW9kZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCByZW5kZXJlcihuZXdSZW5kZXJlcjogV2ViR0xSZW5kZXJlckNvbXBvbmVudCkge1xuICAgIHRoaXMuX3JlbmRlcmVyID0gbmV3UmVuZGVyZXI7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJlbmRlcmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJlcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKSB7XG4gICAgdGhpcy5wYXJlbnRJbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAvLyBUcmlnZ2VyIG1vZGVsIGFjcXVpc2l0aW9uIG5vdyB0aGF0IHRoZSBwYXJlbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuXG4gICAgdGhpcy5tb2RlbCA9IHRoaXMubW9kZWw7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCByZXJlbmRlcigpIHtcbiAgICBzdXBlci5yZXJlbmRlcigpO1xuXG4gICAgaWYgKHRoaXMucmVuZGVyZXIpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuT2JqZWN0M0Qge1xuICAgIHJldHVybiBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgfVxufVxuIl19