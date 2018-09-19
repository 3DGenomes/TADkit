/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var AbstractModelLoader = /** @class */ (function (_super) {
    tslib_1.__extends(AbstractModelLoader, _super);
    function AbstractModelLoader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Flag to signal whether the parent class instance AbstractObject3D called the
         * overwritten method {\@link ModelLoaderDirective#afterInit} yet.
         *
         * Unless that method was called, no methods and properties of {\@link AbstractObject3D}
         * may be safely accessed, especially {\@link AbstractObject3D#addChild} and
         * {\@link AbstractObject3D.renderer}.
         */
        _this.parentInitialized = false;
        return _this;
    }
    Object.defineProperty(AbstractModelLoader.prototype, "model", {
        get: /**
         * The current model data source (usually a URI).
         * @return {?}
         */
        function () {
            return this._model;
        },
        /**
         * The model data source (usually a URI).
         * Settings this property only hides the previous model upon successful
         * loading of the new one. This especially means that if the new data source
         * is invalid, the old model will *not* be removed from the scene.
         */
        set: /**
         * The model data source (usually a URI).
         * Settings this property only hides the previous model upon successful
         * loading of the new one. This especially means that if the new data source
         * is invalid, the old model will *not* be removed from the scene.
         * @param {?} newModelUrl
         * @return {?}
         */
        function (newModelUrl) {
            var _this = this;
            this._model = newModelUrl;
            // Delay model loading until the parent has been initialized,
            // so that we can call addChild().
            if (!this.parentInitialized) {
                return;
            }
            this.loadModelObject().then(function (newModel) {
                if (_this.currentLoadedModelObject) {
                    _this.removeChild(_this.currentLoadedModelObject);
                }
                _this.currentLoadedModelObject = newModel;
                _this.addChild(newModel);
                if (_this.renderer) {
                    _this.renderer.render();
                }
            }).catch(function (err) {
                console.error(err);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractModelLoader.prototype, "renderer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._renderer;
        },
        set: /**
         * @param {?} newRenderer
         * @return {?}
         */
        function (newRenderer) {
            this._renderer = newRenderer;
            this._renderer.render();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AbstractModelLoader.prototype.afterInit = /**
     * @return {?}
     */
    function () {
        this.parentInitialized = true;
        // Trigger model acquisition now that the parent has been initialized.
        this.model = this.model;
    };
    /**
     * @return {?}
     */
    AbstractModelLoader.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.currentLoadedModelObject) {
            this.removeChild(this.currentLoadedModelObject);
        }
    };
    /**
     * @return {?}
     */
    AbstractModelLoader.prototype.rerender = /**
     * @return {?}
     */
    function () {
        _super.prototype.rerender.call(this);
        if (this.renderer) {
            this.renderer.render();
        }
    };
    /**
     * @return {?}
     */
    AbstractModelLoader.prototype.newObject3DInstance = /**
     * @return {?}
     */
    function () {
        return new THREE.Object3D();
    };
    AbstractModelLoader.propDecorators = {
        model: [{ type: Input }],
        renderer: [{ type: Input }]
    };
    return AbstractModelLoader;
}(AbstractObject3D));
export { AbstractModelLoader };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtbW9kZWwtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL29iamVjdHMvbG9hZGVycy9hYnN0cmFjdC1tb2RlbC1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQTZCLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRixPQUFPLEtBQUssS0FBSyxNQUFNLFlBQVksQ0FBQzs7Ozs7Ozs7OztJQVNjLCtDQUFnQzs7Ozs7Ozs7Ozs7a0NBYXBELEtBQUs7OztJQXVCakMsc0JBQ1csc0NBQUs7Ozs7OztZQTZCZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7O1FBcENyQjs7Ozs7V0FLRzs7Ozs7Ozs7O1FBQ0gsVUFDaUIsV0FBbUI7WUFEcEMsaUJBd0JDO1lBdEJDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDOzs7WUFJMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDM0IsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBQ2xDLElBQUksS0FBSSxDQUFDLHdCQUF3QixFQUFFO29CQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2lCQUNqRDtnQkFFRCxLQUFJLENBQUMsd0JBQXdCLEdBQUcsUUFBUSxDQUFDO2dCQUN6QyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUV4QixJQUFJLEtBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ3hCO2FBQ0YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEdBQUc7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQixDQUFDLENBQUM7U0FDSjs7O09BQUE7SUFTRCxzQkFDVyx5Q0FBUTs7Ozs7WUFNakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7Ozs7UUFQeEIsVUFDb0IsV0FBbUM7WUFDckQsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN6Qjs7O09BQUE7Ozs7SUFNUyx1Q0FBUzs7O0lBQW5CO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQzs7UUFHOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ3pCOzs7O0lBRUQseUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztTQUNqRDtLQUNGOzs7O0lBRVMsc0NBQVE7OztJQUFsQjtRQUNFLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBRWpCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7SUFFUyxpREFBbUI7OztJQUE3QjtRQUNFLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDN0I7O3dCQWxFQSxLQUFLOzJCQWlDTCxLQUFLOzs4QkFqRlI7RUFZa0QsZ0JBQWdCO1NBQTVDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuaW1wb3J0IHsgV2ViR0xSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuLyoqXG4gKiBIZWxwZXIgcGFyZW50IGNsYXNzIGZvciBtb2RlbCBsb2FkZXIgZGlyZWN0aXZlcy5cbiAqXG4gKiBAc2VlIE9iamVjdExvYWRlckRpcmVjdGl2ZVxuICogQHNlZSBPYmpMb2FkZXJEaXJlY3RpdmVcbiAqIEBzZWUgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RNb2RlbExvYWRlciBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuT2JqZWN0M0Q+IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9tb2RlbDogc3RyaW5nO1xuICBwcml2YXRlIF9yZW5kZXJlcjogV2ViR0xSZW5kZXJlckNvbXBvbmVudDtcblxuICAvKipcbiAgICogRmxhZyB0byBzaWduYWwgd2hldGhlciB0aGUgcGFyZW50IGNsYXNzIGluc3RhbmNlIEFic3RyYWN0T2JqZWN0M0QgY2FsbGVkIHRoZVxuICAgKiBvdmVyd3JpdHRlbiBtZXRob2Qge0BsaW5rIE1vZGVsTG9hZGVyRGlyZWN0aXZlI2FmdGVySW5pdH0geWV0LlxuICAgKlxuICAgKiBVbmxlc3MgdGhhdCBtZXRob2Qgd2FzIGNhbGxlZCwgbm8gbWV0aG9kcyBhbmQgcHJvcGVydGllcyBvZiB7QGxpbmsgQWJzdHJhY3RPYmplY3QzRH1cbiAgICogbWF5IGJlIHNhZmVseSBhY2Nlc3NlZCwgZXNwZWNpYWxseSB7QGxpbmsgQWJzdHJhY3RPYmplY3QzRCNhZGRDaGlsZH0gYW5kXG4gICAqIHtAbGluayBBYnN0cmFjdE9iamVjdDNELnJlbmRlcmVyfS5cbiAgICovXG4gIHByaXZhdGUgcGFyZW50SW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgY3VycmVudExvYWRlZE1vZGVsT2JqZWN0OiBUSFJFRS5PYmplY3QzRCB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogTG9hZCB0aGUgbW9kZWwgb2JqZWN0LlxuICAgKlxuICAgKiBTb21lIGxvYWRlcnMgKGUuZy4gQ29sbGFkYUxvYWRlcikgYWxzbyBwcm92aWRlIG90aGVyIG1vZGVsIGluZm9ybWF0aW9uXG4gICAqIHVwb24gbG9hZGluZyBiZXNpZGVzIHRoZSBcInJhd1wiIG1vZGVsIG9iamVjdC9zY2VuZS4gSW4gdGhlc2UgY2FzZXNcbiAgICogaW1wbGVtZW50aW5nIGNoaWxkIGNsYXNzZXMgYXJlIGluZGVlZCBzdXBwb3NlZCB0byByZXR1cm4gdGhlIFwicmF3XCIgbW9kZWxcbiAgICogb2JqZWN0LlxuICAgKiBUaGUgZGF0YSBzb3VyY2UgKHVzdWFsbHkgYSBVUkksIGFsdGhvdWdoIGNoaWxkIGNsYXNzZXMgYXJlIGZyZWUgdG8gaW1wbGVtZW50XG4gICAqIG90aGVyIG1lYW5zIGFzIHdlbGwpIGZyb20gd2hpY2ggdGhlIG1vZGVsIHNoYWxsIGJlIGxvYWRlZCBjYW4gYmUgb2J0YWluZWQgYnlcbiAgICoge0BsaW5rIE1vZGVsTG9hZGVyRGlyZWN0aXZlLm1vZGVsfS5cbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKTogUHJvbWlzZTxUSFJFRS5PYmplY3QzRD47XG5cbiAgLyoqXG4gICAqIFRoZSBtb2RlbCBkYXRhIHNvdXJjZSAodXN1YWxseSBhIFVSSSkuXG4gICAqIFNldHRpbmdzIHRoaXMgcHJvcGVydHkgb25seSBoaWRlcyB0aGUgcHJldmlvdXMgbW9kZWwgdXBvbiBzdWNjZXNzZnVsXG4gICAqIGxvYWRpbmcgb2YgdGhlIG5ldyBvbmUuIFRoaXMgZXNwZWNpYWxseSBtZWFucyB0aGF0IGlmIHRoZSBuZXcgZGF0YSBzb3VyY2VcbiAgICogaXMgaW52YWxpZCwgdGhlIG9sZCBtb2RlbCB3aWxsICpub3QqIGJlIHJlbW92ZWQgZnJvbSB0aGUgc2NlbmUuXG4gICAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG1vZGVsKG5ld01vZGVsVXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9tb2RlbCA9IG5ld01vZGVsVXJsO1xuXG4gICAgLy8gRGVsYXkgbW9kZWwgbG9hZGluZyB1bnRpbCB0aGUgcGFyZW50IGhhcyBiZWVuIGluaXRpYWxpemVkLFxuICAgIC8vIHNvIHRoYXQgd2UgY2FuIGNhbGwgYWRkQ2hpbGQoKS5cbiAgICBpZiAoIXRoaXMucGFyZW50SW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRNb2RlbE9iamVjdCgpLnRoZW4obmV3TW9kZWwgPT4ge1xuICAgICAgaWYgKHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0KSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCA9IG5ld01vZGVsO1xuICAgICAgdGhpcy5hZGRDaGlsZChuZXdNb2RlbCk7XG5cbiAgICAgIGlmICh0aGlzLnJlbmRlcmVyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKCk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBtb2RlbCBkYXRhIHNvdXJjZSAodXN1YWxseSBhIFVSSSkuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG1vZGVsKCkge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgcmVuZGVyZXIobmV3UmVuZGVyZXI6IFdlYkdMUmVuZGVyZXJDb21wb25lbnQpIHtcbiAgICB0aGlzLl9yZW5kZXJlciA9IG5ld1JlbmRlcmVyO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIGdldCByZW5kZXJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXI7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCkge1xuICAgIHRoaXMucGFyZW50SW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgLy8gVHJpZ2dlciBtb2RlbCBhY3F1aXNpdGlvbiBub3cgdGhhdCB0aGUgcGFyZW50IGhhcyBiZWVuIGluaXRpYWxpemVkLlxuICAgIHRoaXMubW9kZWwgPSB0aGlzLm1vZGVsO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0KSB7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVyZW5kZXIoKSB7XG4gICAgc3VwZXIucmVyZW5kZXIoKTtcblxuICAgIGlmICh0aGlzLnJlbmRlcmVyKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLk9iamVjdDNEIHtcbiAgICByZXR1cm4gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG4gIH1cbn1cbiJdfQ==