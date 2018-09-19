/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, forwardRef } from '@angular/core';
import * as THREE from 'three-full';
import { AbstractModelLoader } from './abstract-model-loader';
import { AbstractObject3D } from '../abstract-object-3d';
var ColladaLoaderDirective = /** @class */ (function (_super) {
    tslib_1.__extends(ColladaLoaderDirective, _super);
    function ColladaLoaderDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loader = new THREE.ColladaLoader();
        return _this;
    }
    /**
     * @return {?}
     */
    ColladaLoaderDirective.prototype.loadModelObject = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.loader.load(_this.model, function (model) {
                            resolve(model.scene);
                        }, undefined, reject);
                    })];
            });
        });
    };
    ColladaLoaderDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'three-collada-loader',
                    providers: [{ provide: AbstractObject3D, useExisting: forwardRef(function () { return ColladaLoaderDirective; }) }]
                },] },
    ];
    return ColladaLoaderDirective;
}(AbstractModelLoader));
export { ColladaLoaderDirective };
if (false) {
    /** @type {?} */
    ColladaLoaderDirective.prototype.loader;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFkYS1sb2FkZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL29iamVjdHMvbG9hZGVycy9jb2xsYWRhLWxvYWRlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEtBQUssS0FBSyxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7SUFNYixrREFBbUI7Ozt1QkFDNUMsSUFBSSxLQUFLLENBQUMsYUFBYSxFQUFFOzs7Ozs7SUFFMUIsZ0RBQWU7OztJQUEvQjs7OztnQkFDRSxzQkFBTyxJQUFJLE9BQU8sQ0FBaUIsVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDakQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxVQUFBLEtBQUs7NEJBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ3RCLEVBQ0QsU0FBUyxFQUNULE1BQU0sQ0FDUCxDQUFDO3FCQUNILENBQUMsRUFBQzs7O0tBQ0o7O2dCQWhCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsc0JBQXNCLEVBQXRCLENBQXNCLENBQUMsRUFBRSxDQUFDO2lCQUNsRzs7aUNBUkQ7RUFTNEMsbUJBQW1CO1NBQWxELHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsTG9hZGVyIH0gZnJvbSAnLi9hYnN0cmFjdC1tb2RlbC1sb2FkZXInO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLWNvbGxhZGEtbG9hZGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RNb2RlbExvYWRlciB7XG4gIHByaXZhdGUgbG9hZGVyID0gbmV3IFRIUkVFLkNvbGxhZGFMb2FkZXIoKTtcblxuICBwcm90ZWN0ZWQgYXN5bmMgbG9hZE1vZGVsT2JqZWN0KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUSFJFRS5PYmplY3QzRD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5sb2FkZXIubG9hZCh0aGlzLm1vZGVsLCBtb2RlbCA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShtb2RlbC5zY2VuZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgcmVqZWN0XG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG4iXX0=