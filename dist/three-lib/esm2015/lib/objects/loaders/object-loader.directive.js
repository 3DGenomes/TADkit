/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, forwardRef } from '@angular/core';
import { AbstractObject3D } from '../abstract-object-3d';
import { AbstractModelLoader } from './abstract-model-loader';
import * as THREE from 'three-full';
export class ObjectLoaderDirective extends AbstractModelLoader {
    constructor() {
        super(...arguments);
        this.loader = new THREE.ObjectLoader();
    }
    /**
     * @return {?}
     */
    loadModelObject() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.loader.load(this.model, model => {
                    resolve(model);
                }, undefined, reject);
            });
        });
    }
}
ObjectLoaderDirective.decorators = [
    { type: Directive, args: [{
                selector: 'three-object-loader',
                providers: [{ provide: AbstractObject3D, useExisting: forwardRef(() => ObjectLoaderDirective) }]
            },] },
];
if (false) {
    /** @type {?} */
    ObjectLoaderDirective.prototype.loader;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LWxvYWRlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90aHJlZS1saWIvIiwic291cmNlcyI6WyJsaWIvb2JqZWN0cy9sb2FkZXJzL29iamVjdC1sb2FkZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxLQUFLLEtBQUssTUFBTSxZQUFZLENBQUM7QUFNcEMsTUFBTSw0QkFBNkIsU0FBUSxtQkFBbUI7OztzQkFDM0MsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFOzs7OztJQUV6QixlQUFlOztZQUM3QixPQUFPLElBQUksT0FBTyxDQUFpQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRTtvQkFDakMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQixFQUNELFNBQVMsRUFDVCxNQUFNLENBQ1AsQ0FBQzthQUNILENBQUMsQ0FBQzs7S0FDSjs7O1lBaEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQzthQUNqRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsTG9hZGVyIH0gZnJvbSAnLi9hYnN0cmFjdC1tb2RlbC1sb2FkZXInO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLW9iamVjdC1sb2FkZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE9iamVjdExvYWRlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgT2JqZWN0TG9hZGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RNb2RlbExvYWRlciB7XG4gIHByaXZhdGUgbG9hZGVyID0gbmV3IFRIUkVFLk9iamVjdExvYWRlcigpO1xuXG4gIHByb3RlY3RlZCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICByZWplY3RcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==