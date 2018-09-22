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
    /**
     * Helper parent class for model loader directives.
     *
     * @see ObjectLoaderDirective
     * @see ObjLoaderDirective
     * @see ColladaLoaderDirective
     */
    constructor() {
        super(...arguments);
        /**
         * Flag to signal whether the parent class instance AbstractObject3D called the
         * overwritten method {@link ModelLoaderDirective#afterInit} yet.
         *
         * Unless that method was called, no methods and properties of {@link AbstractObject3D}
         * may be safely accessed, especially {@link AbstractObject3D#addChild} and
         * {@link AbstractObject3D.renderer}.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtbW9kZWwtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL29iamVjdHMvbG9hZGVycy9hYnN0cmFjdC1tb2RlbC1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBNkIsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pGLE9BQU8sS0FBSyxLQUFLLE1BQU0sWUFBWSxDQUFDOzs7Ozs7Ozs7QUFTcEMsTUFBTSwwQkFBb0MsU0FBUSxnQkFBZ0M7SUFQbEY7Ozs7OztPQU1HO0lBQ0g7O1FBS0U7Ozs7Ozs7V0FPRztRQUNLLHNCQUFpQixHQUFHLEtBQUssQ0FBQztJQTBGcEMsQ0FBQzs7Ozs7Ozs7O0lBbkVDLElBQ1csS0FBSyxDQUFDLFdBQW1CO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1FBRTFCLDZEQUE2RDtRQUM3RCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMzQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3JDLElBQUksSUFBSSxDQUFDLHdCQUF3QixFQUFFO2dCQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2FBQ2pEO1lBRUQsSUFBSSxDQUFDLHdCQUF3QixHQUFHLFFBQVEsQ0FBQztZQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXhCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUN4QjtRQUNILENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUtELElBQVcsS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELElBQ1csUUFBUSxDQUFDLFdBQW1DO1FBQ3JELElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVELElBQVcsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVTLFNBQVM7UUFDakIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUU5QixzRUFBc0U7UUFDdEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztTQUNqRDtJQUNILENBQUM7Ozs7SUFFUyxRQUFRO1FBQ2hCLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7Ozs7SUFFUyxtQkFBbUI7UUFDM0IsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7b0JBbEVBLEtBQUs7dUJBaUNMLEtBQUs7Ozs7SUFuRU4scUNBQXVCOztJQUN2Qix3Q0FBMEM7Ozs7Ozs7Ozs7SUFVMUMsZ0RBQWtDOztJQUVsQyx1REFBK0Q7Ozs7Ozs7Ozs7Ozs7O0lBYS9ELGdFQUFvRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuaW1wb3J0IHsgV2ViR0xSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuLyoqXG4gKiBIZWxwZXIgcGFyZW50IGNsYXNzIGZvciBtb2RlbCBsb2FkZXIgZGlyZWN0aXZlcy5cbiAqXG4gKiBAc2VlIE9iamVjdExvYWRlckRpcmVjdGl2ZVxuICogQHNlZSBPYmpMb2FkZXJEaXJlY3RpdmVcbiAqIEBzZWUgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RNb2RlbExvYWRlciBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuT2JqZWN0M0Q+IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9tb2RlbDogc3RyaW5nO1xuICBwcml2YXRlIF9yZW5kZXJlcjogV2ViR0xSZW5kZXJlckNvbXBvbmVudDtcblxuICAvKipcbiAgICogRmxhZyB0byBzaWduYWwgd2hldGhlciB0aGUgcGFyZW50IGNsYXNzIGluc3RhbmNlIEFic3RyYWN0T2JqZWN0M0QgY2FsbGVkIHRoZVxuICAgKiBvdmVyd3JpdHRlbiBtZXRob2Qge0BsaW5rIE1vZGVsTG9hZGVyRGlyZWN0aXZlI2FmdGVySW5pdH0geWV0LlxuICAgKlxuICAgKiBVbmxlc3MgdGhhdCBtZXRob2Qgd2FzIGNhbGxlZCwgbm8gbWV0aG9kcyBhbmQgcHJvcGVydGllcyBvZiB7QGxpbmsgQWJzdHJhY3RPYmplY3QzRH1cbiAgICogbWF5IGJlIHNhZmVseSBhY2Nlc3NlZCwgZXNwZWNpYWxseSB7QGxpbmsgQWJzdHJhY3RPYmplY3QzRCNhZGRDaGlsZH0gYW5kXG4gICAqIHtAbGluayBBYnN0cmFjdE9iamVjdDNELnJlbmRlcmVyfS5cbiAgICovXG4gIHByaXZhdGUgcGFyZW50SW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgY3VycmVudExvYWRlZE1vZGVsT2JqZWN0OiBUSFJFRS5PYmplY3QzRCB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogTG9hZCB0aGUgbW9kZWwgb2JqZWN0LlxuICAgKlxuICAgKiBTb21lIGxvYWRlcnMgKGUuZy4gQ29sbGFkYUxvYWRlcikgYWxzbyBwcm92aWRlIG90aGVyIG1vZGVsIGluZm9ybWF0aW9uXG4gICAqIHVwb24gbG9hZGluZyBiZXNpZGVzIHRoZSBcInJhd1wiIG1vZGVsIG9iamVjdC9zY2VuZS4gSW4gdGhlc2UgY2FzZXNcbiAgICogaW1wbGVtZW50aW5nIGNoaWxkIGNsYXNzZXMgYXJlIGluZGVlZCBzdXBwb3NlZCB0byByZXR1cm4gdGhlIFwicmF3XCIgbW9kZWxcbiAgICogb2JqZWN0LlxuICAgKiBUaGUgZGF0YSBzb3VyY2UgKHVzdWFsbHkgYSBVUkksIGFsdGhvdWdoIGNoaWxkIGNsYXNzZXMgYXJlIGZyZWUgdG8gaW1wbGVtZW50XG4gICAqIG90aGVyIG1lYW5zIGFzIHdlbGwpIGZyb20gd2hpY2ggdGhlIG1vZGVsIHNoYWxsIGJlIGxvYWRlZCBjYW4gYmUgb2J0YWluZWQgYnlcbiAgICoge0BsaW5rIE1vZGVsTG9hZGVyRGlyZWN0aXZlLm1vZGVsfS5cbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKTogUHJvbWlzZTxUSFJFRS5PYmplY3QzRD47XG5cbiAgLyoqXG4gICAqIFRoZSBtb2RlbCBkYXRhIHNvdXJjZSAodXN1YWxseSBhIFVSSSkuXG4gICAqIFNldHRpbmdzIHRoaXMgcHJvcGVydHkgb25seSBoaWRlcyB0aGUgcHJldmlvdXMgbW9kZWwgdXBvbiBzdWNjZXNzZnVsXG4gICAqIGxvYWRpbmcgb2YgdGhlIG5ldyBvbmUuIFRoaXMgZXNwZWNpYWxseSBtZWFucyB0aGF0IGlmIHRoZSBuZXcgZGF0YSBzb3VyY2VcbiAgICogaXMgaW52YWxpZCwgdGhlIG9sZCBtb2RlbCB3aWxsICpub3QqIGJlIHJlbW92ZWQgZnJvbSB0aGUgc2NlbmUuXG4gICAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG1vZGVsKG5ld01vZGVsVXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9tb2RlbCA9IG5ld01vZGVsVXJsO1xuXG4gICAgLy8gRGVsYXkgbW9kZWwgbG9hZGluZyB1bnRpbCB0aGUgcGFyZW50IGhhcyBiZWVuIGluaXRpYWxpemVkLFxuICAgIC8vIHNvIHRoYXQgd2UgY2FuIGNhbGwgYWRkQ2hpbGQoKS5cbiAgICBpZiAoIXRoaXMucGFyZW50SW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRNb2RlbE9iamVjdCgpLnRoZW4obmV3TW9kZWwgPT4ge1xuICAgICAgaWYgKHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0KSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCA9IG5ld01vZGVsO1xuICAgICAgdGhpcy5hZGRDaGlsZChuZXdNb2RlbCk7XG5cbiAgICAgIGlmICh0aGlzLnJlbmRlcmVyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKCk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBtb2RlbCBkYXRhIHNvdXJjZSAodXN1YWxseSBhIFVSSSkuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG1vZGVsKCkge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgcmVuZGVyZXIobmV3UmVuZGVyZXI6IFdlYkdMUmVuZGVyZXJDb21wb25lbnQpIHtcbiAgICB0aGlzLl9yZW5kZXJlciA9IG5ld1JlbmRlcmVyO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIGdldCByZW5kZXJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXI7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCkge1xuICAgIHRoaXMucGFyZW50SW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgLy8gVHJpZ2dlciBtb2RlbCBhY3F1aXNpdGlvbiBub3cgdGhhdCB0aGUgcGFyZW50IGhhcyBiZWVuIGluaXRpYWxpemVkLlxuICAgIHRoaXMubW9kZWwgPSB0aGlzLm1vZGVsO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0KSB7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVyZW5kZXIoKSB7XG4gICAgc3VwZXIucmVyZW5kZXIoKTtcblxuICAgIGlmICh0aGlzLnJlbmRlcmVyKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLk9iamVjdDNEIHtcbiAgICByZXR1cm4gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG4gIH1cbn1cbiJdfQ==